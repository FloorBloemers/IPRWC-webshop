package com.example.controllers;

import com.example.daos.userDAO;
import com.example.exception.OrderNotFoundException;
import com.example.models.Order;
import com.example.models.User;
import com.example.services.CustomerService;
import com.example.services.JwtService;
import com.example.services.OrderService;
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
    private final UserService userService;


    @Autowired
    public OrderController(OrderService orderService, JwtService jwtService, userDAO userDAO, UserService userService) {
        this.orderService = orderService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
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
    public ResponseEntity<Order> createOrder(@RequestBody Order order, @RequestHeader("Authorization") String request) {
        String jwt = jwtService.getJwtFromToken(request);
        String userId = jwtService.extractUserId(jwt);
        order.setUser(UserService.getUserByUserId(UUID.fromString(userId)));
        Order createdOrder = orderService.createOrder(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PostMapping("/no-account")
    public ResponseEntity<Order> createOrderWithoutAccount(@RequestBody Order order) {
        Order createdOrder = orderService.createOrderWithoutAccount(order);
        return new ResponseEntity<>(createdOrder, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order updatedOrder) {
        try {
            Order updated = orderService.updateOrder(orderId, updatedOrder);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody String status) {
        try {
            Order updated = orderService.updateOrderStatus(orderId, status);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (OrderNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}