package com.example.services;

import com.example.exception.ProductNotFoundException;
import com.example.models.Product;
import com.example.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updatedProduct) throws ProductNotFoundException {
        if (productRepository.existsById(productId)) {
            updatedProduct.setId(productId);
            return productRepository.save(updatedProduct);
        } else {
            throw new ProductNotFoundException("Product not found with ID: " + productId);
        }
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
}