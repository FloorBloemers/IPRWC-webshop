package com.example.services;

import com.example.models.ProductModel;
import com.example.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<ProductModel> getAll() {
        return repo.findAll();
    }

    public ProductModel getById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public ProductModel save(ProductModel product) {
        return repo.save(product);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
