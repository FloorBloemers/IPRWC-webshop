package com.example.services;

import com.example.exception.OrderNotFoundException;
import com.example.models.User;
import com.example.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUserId(UUID userId) {
        User userFromDatabase = userService.getUserById(userId);
        return orderRepository.findByUser(userFromDatabase);
    }

    public Order createOrder(Order order) {
        order.setCurrentDateAndNewOrder();
        return orderRepository.save(order);
    }

    public Order updateOrder(Long orderId, Order updatedOrder) throws OrderNotFoundException {
        if (orderRepository.existsById(orderId)) {
            updatedOrder.setId(orderId);
            return orderRepository.save(updatedOrder);
        } else {
            throw new OrderNotFoundException("Order not found with ID: " + orderId);
        }
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }

    public Order updateOrderStatus(Long orderId, String status) throws OrderNotFoundException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found with ID: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }
}