package com.example.mapper;

import com.example.dtos.UserResponseDTO;
import com.example.dtos.UserCreateDTO;
import com.example.models.Role;
import com.example.models.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserMapper {

    public User toEntity(UserCreateDTO userCreateDTO) {
//        Rank rank = rankDao.findById(UUID.fromString(userCreateDTO.getRank()));
//        System.out.println(rank.getRankName());
        Role role = Role.valueOf(userCreateDTO.getRole());

        return User.builder()
                .username(userCreateDTO.getUsername())
                .password(userCreateDTO.getPassword())
                .role(role)
                .build();
    }

    public UserResponseDTO fromEntity(User user) {

        UserResponseDTO.UserResponseDTOBuilder res = UserResponseDTO
                .builder()
                .username(user.getUsername())
                .id(user.getId())
                .role(user.getRole());

        return res.build();
    }
}
