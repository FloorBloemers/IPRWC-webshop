package com.example.repositories;

import com.example.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(UUID userId);
}