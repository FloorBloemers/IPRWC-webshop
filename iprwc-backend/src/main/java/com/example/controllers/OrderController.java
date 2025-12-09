package com.example.controllers;

import com.example.daos.userDAO;
import com.example.exception.OrderNotFoundException;
import com.example.exception.UserNotFoundException;
import com.example.models.Order;
import com.example.models.User;
import com.example.services.JwtService;
import com.example.services.OrderService;
import com.example.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;
    private final JwtService jwtService;
    private final userDAO userDao;


    @Autowired
    public OrderController(OrderService orderService, JwtService jwtService, userDAO userDao) {
        this.orderService = orderService;
        this.jwtService = jwtService;
        this.userDao = userDao;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order,
                                             @RequestHeader("Authorization") String authHeader)
            throws UserNotFoundException {
        // Strip "Bearer " prefix
        String token = jwtService.getJwtFromToken(authHeader);

        // Extract userId from JWT subject
        String userIdString = jwtService.extractUserId(token);
        UUID userId = UUID.fromString(userIdString);

        // Look up user in DB
        User user = userDao.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));

        // Attach user to order
        order.setUser(user);

        // Save order
        Order createdOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order updatedOrder) {
        try {
            Order updated = orderService.updateOrder(orderId, updatedOrder);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        try {
            Order updated = orderService.updateOrderStatus(orderId, status);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}