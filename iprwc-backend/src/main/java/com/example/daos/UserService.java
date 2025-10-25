package com.example.services;

import com.example.models.UserModel;
import com.example.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<UserModel> getAll() {
        return repo.findAll();
    }

    public UserModel getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public UserModel save(UserModel user) {
        return repo.save(user);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}