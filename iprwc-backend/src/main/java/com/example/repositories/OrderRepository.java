package com.example.repositories;

import com.example.models.Customer;
import com.example.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomer(Customer customerFromDatabase);
}