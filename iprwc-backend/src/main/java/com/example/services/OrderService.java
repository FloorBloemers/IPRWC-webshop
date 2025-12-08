package com.example.services;

import com.example.exception.OrderNotFoundException;
import com.example.models.User;
import com.example.models.Order;
import com.example.daos.userDAO;
import com.example.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final userDAO userDAO;

    @Autowired
    public OrderService(OrderRepository orderRepository, userDAO userDAO) {
        this.orderRepository = orderRepository;
        this.userDAO = userDAO;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getOrdersByUserId(UUID userId) {
        User userFromDatabase = userDAO.findById(userId)
                .orElseThrow(() -> new OrderNotFoundException("User not found with ID: " + userId));
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
