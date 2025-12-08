package com.example.seeder;

import com.example.daos.userDAO;
import com.example.models.Role;
import com.example.models.User;
import com.example.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class AdminSeeder {

    private final userDAO userDAO;
    private final PasswordEncoder passwordEncoder;
    private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);


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
            logger.warn("Couldn't create admin account: {}", e.getMessage());
        }

        var admin2 = User.builder()
                .username("adminfloor")
                .password(passwordEncoder.encode("admin"))
                .role(Role.ADMIN)
                .build();
        try {
            this.userDAO.save(admin2);
        } catch (Exception e) {
            logger.warn("Couldn't create admin account: {}", e.getMessage());
        }
    }
}
