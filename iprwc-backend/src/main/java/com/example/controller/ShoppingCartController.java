package com.example.controllers;

import com.example.models.ApiResponseModel;
import com.example.models.ShoppingCartModel;
import com.example.services.ShoppingCartService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
@CrossOrigin(origins = {"http://localhost:4200"})
public class ShoppingCartController {
    private final ShoppingCartService service;

    public ShoppingCartController(ShoppingCartService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponseModel<List<ShoppingCartModel>> getAll() {
        return new ApiResponseModel<>(HttpStatus.OK, service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponseModel<ShoppingCartModel> getById(@PathVariable Long id) {
        ShoppingCartModel cart = service.getById(id);
        if (cart == null) {
            return new ApiResponseModel<>(HttpStatus.NOT_FOUND, "Cart not found");
        }
        return new ApiResponseModel<>(HttpStatus.OK, cart);
    }

    @PostMapping
    public ApiResponseModel<ShoppingCartModel> create(@RequestBody ShoppingCartModel cart) {
        return new ApiResponseModel<>(HttpStatus.CREATED, service.save(cart));
    }

    @DeleteMapping("/{id}")
    public ApiResponseModel<String> delete(@PathVariable Long id) {
        service.delete(id);
        return new ApiResponseModel<>(HttpStatus.OK, "Cart deleted");
    }
}