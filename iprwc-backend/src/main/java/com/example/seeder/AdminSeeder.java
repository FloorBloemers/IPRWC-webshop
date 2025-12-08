package com.example.seeder;

import com.example.daos.userDAO;
import com.example.models.Role;
import com.example.models.User;
import com.example.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
@Slf4j
public class AdminSeeder {

    private final userDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Value("${super-admin.name}")
    private String adminName;

    @Value("${super-admin.password}")
    private String adminPassword;

    public void seed() {
        var admin = User.builder()
                .username(adminName)
                .password(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN)
                .build();
        try {
            this.userDAO.save(admin);
        } catch (Exception e) {
            log.warn("Couldn't create admin account: {}", e.getMessage());
        }

        var admin2 = User.builder()
                .username("adminfloor")
                .password(passwordEncoder.encode("admin"))
                .role(Role.ADMIN)
                .build();
        try {
            this.userDAO.save(admin2);
        } catch (Exception e) {
            log.warn("Couldn't create admin account: {}", e.getMessage());
        }
    }
}
