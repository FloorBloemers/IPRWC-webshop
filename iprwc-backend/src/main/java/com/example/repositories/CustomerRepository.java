package com.example.repositories;

import com.example.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByOptionalRegisteredUser_Id(UUID userId);
    Optional<Customer> findByUsername(String username);
}
