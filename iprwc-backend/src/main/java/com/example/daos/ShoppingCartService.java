package com.example.services;

import com.example.models.ShoppingCartModel;
import com.example.repositories.ShoppingCartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingCartService {
    private final ShoppingCartRepository repo;

    public ShoppingCartService(ShoppingCartRepository repo) {
        this.repo = repo;
    }

    public List<ShoppingCartModel> getAll() {
        return repo.findAll();
    }

    public ShoppingCartModel getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public ShoppingCartModel save(ShoppingCartModel cart) {
        return repo.save(cart);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}