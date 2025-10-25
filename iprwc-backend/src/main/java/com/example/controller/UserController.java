package com.example.controllers;

import com.example.models.ApiResponseModel;
import com.example.models.UserModel;
import com.example.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ApiResponseModel<List<UserModel>> getAll() {
        return new ApiResponseModel<>(HttpStatus.OK, service.getAll());
    }

    @GetMapping("/{id}")
    public ApiResponseModel<UserModel> getById(@PathVariable Long id) {
        UserModel user = service.getById(id);
        if (user == null) {
            return new ApiResponseModel<>(HttpStatus.NOT_FOUND, "User not found");
        }
        return new ApiResponseModel<>(HttpStatus.OK, user);
    }

    @PostMapping
    public ApiResponseModel<UserModel> create(@RequestBody UserModel user) {
        return new ApiResponseModel<>(HttpStatus.CREATED, service.save(user));
    }

    @DeleteMapping("/{id}")
    public ApiResponseModel<String> delete(@PathVariable Long id) {
        service.delete(id);
        return new ApiResponseModel<>(HttpStatus.OK, "User deleted");
    }
}