package com.example.repositories;

import com.example.models.User;
import com.example.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User userFromDatabase);
}