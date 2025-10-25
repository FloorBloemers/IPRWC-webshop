package com.example.controllers;

import com.example.models.ApiResponseModel;
import com.example.models.ProductModel;
import com.example.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponseModel<List<ProductModel>> getAll() {
        return new ApiResponseModel<>(HttpStatus.OK, service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponseModel<ProductModel> getById(@PathVariable Long id) {
        ProductModel product = service.getById(id);
        if (product == null) {
            return new ApiResponseModel<>(HttpStatus.NOT_FOUND, "Product not found");
        }
        return new ApiResponseModel<>(HttpStatus.OK, product);
    }

    @PostMapping
    public ApiResponseModel<ProductModel> create(@RequestBody ProductModel product) {
        return new ApiResponseModel<>(HttpStatus.CREATED, service.save(product));
    }

    @DeleteMapping("/{id}")
    public ApiResponseModel<String> delete(@PathVariable Long id) {
        service.delete(id);
        return new ApiResponseModel<>(HttpStatus.OK, "Product deleted");
    }
}