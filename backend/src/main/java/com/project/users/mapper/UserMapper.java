package com.project.users.mapper;

import com.project.users.dto.UserRequest;
import com.project.users.dto.UserResponse;
import com.project.users.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(UserRequest request) {
        return User.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .phone(request.getPhone())
                .build();
    }

    public UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .phone(user.getPhone())
                .build();
    }
}
