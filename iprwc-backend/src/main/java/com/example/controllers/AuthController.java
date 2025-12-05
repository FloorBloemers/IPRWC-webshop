package com.example.controllers;


import com.example.daos.userDAO;
import com.example.dtos.AuthRequestDTO;
import com.example.dtos.AuthResponseDTO;
import com.example.models.Customer;
import com.example.services.CustomerService;
import com.example.models.User;
import com.example.models.ApiResponse;
import com.example.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping(value = "/login")
    public ApiResponse<AuthResponseDTO> login(@RequestBody AuthRequestDTO loginDTO) {
        String token = authService.login(loginDTO.getUsername(), loginDTO.getPassword());

        return new ApiResponse<>(new AuthResponseDTO(token));
    }

    @PostMapping(value = "/register")
    public ApiResponse<AuthResponseDTO> register(@RequestBody AuthRequestDTO registerDTO) {
        Optional<String> tokenResponse = authService.register(registerDTO.getUsername(), registerDTO.getPassword());

        if (tokenResponse.isEmpty()) {
            return new ApiResponse<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        User savedUser = tokenResponse.get();
        Customer customer = new Customer();
        customer.setName(savedUser.getUsername());
        customer.setOptionalRegisteredUser(savedUser);
        customerService.save(customer);

        String token = tokenResponse.get();

        return new ApiResponse<>(new AuthResponseDTO(token));
    }
}