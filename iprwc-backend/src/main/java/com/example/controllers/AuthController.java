package com.example.controllers;


import com.example.daos.userDAO;
import com.example.services.UserService;
import com.example.services.JwtService;
import com.example.dtos.AuthRequestDTO;
import com.example.dtos.AuthResponseDTO;
import com.example.models.ApiResponse;
import com.example.models.User;
import com.example.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
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
    private final UserService userService;
    private final JwtService jwtService;

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

        String token = tokenResponse.get();

        return new ApiResponse<>(new AuthResponseDTO(token));
    }

    @GetMapping("/logged-in")
    public ResponseEntity<User> getLoggedInUser(@RequestHeader("Authorization") String authHeader) {
        // Extract token from "Bearer <token>"
        String token = authHeader.replace("Bearer ", "").trim();

        // Decode userId from token
        Long userId = jwtService.extractUserId(token);

        // Look up user in DB
        User user = userService.findById(userId);

        return ResponseEntity.ok(user);
    }
}