package com.example.controllers;


import com.example.daos.userDAO;
import com.example.dtos.AuthResponseDTO;
import com.example.dtos.UserCreateDTO;
import com.example.dtos.UserResponseDTO;
import com.example.mapper.UserMapper;
import com.example.models.ApiResponse;
import com.example.models.Role;
import com.example.models.User;
import com.example.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final userDAO userDAO;
    private final UserMapper userMapper;
    private final AuthService authService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    @ResponseBody
    public ApiResponse<List<UserResponseDTO>> getUsers() {
        List<UserResponseDTO> res = userDAO
                .findAll()
                .stream()
                .map(userMapper::fromEntity)
                .toList();

        return new ApiResponse<>(res);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<AuthResponseDTO> register(@RequestBody UserCreateDTO userCreateDTO) {
        Optional<User> foundUser = userDAO.findByUsername(userCreateDTO.getUsername());
        if (foundUser.isPresent()) {
            return new ApiResponse<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.toEntity(userCreateDTO);
        if (user.getUsername() == null || user.getPassword() == null) {
            return new ApiResponse<>("Username or password is empty", HttpStatus.BAD_REQUEST);
        }

        Optional<String> tokenResponse = authService.register(user.getUsername(), user.getPassword());

        if (tokenResponse.isEmpty()) {
            return new ApiResponse<>("User already exists", HttpStatus.BAD_REQUEST);
        }

        User createdUser = userDAO.findByUsername(user.getUsername()).orElseThrow();

        User userWithoutPassword = User.builder()
                .id(createdUser.getId())
                .password(createdUser.getPassword())
                .username(createdUser.getUsername())
                .role(user.getRole())
                .build();

        userDAO.save(userWithoutPassword);


        String token = tokenResponse.get();
        return new ApiResponse<>(new AuthResponseDTO(token));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path = {"/{id}"})
    public ApiResponse<UserResponseDTO> editUser(@PathVariable("id") UUID id, @RequestBody UserCreateDTO userCreateDTO) {
        Optional<User> foundUser = userDAO.findById(id);
        if (foundUser.isEmpty()) {
            return new ApiResponse<>("User not found", HttpStatus.NOT_FOUND);
        }

        User user = foundUser.get();

        if (userCreateDTO.getUsername() != null) {
            user.setUsername(userCreateDTO.getUsername());
        }

        if (userCreateDTO.getRole() != null) {
            user.setRole(Role.valueOf(userCreateDTO.getRole()));
        }

        User createdUser = userDAO.save(user);
        return new ApiResponse<>(userMapper.fromEntity(createdUser));
    }
}