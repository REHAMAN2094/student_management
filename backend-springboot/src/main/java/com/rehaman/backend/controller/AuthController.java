package com.rehaman.backend.controller;

import com.rehaman.backend.dto.LoginRequest;
import com.rehaman.backend.dto.RegisterRequest;
import com.rehaman.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping
    public Map<String, Object> protectedRoute(HttpServletRequest request) {
        Object user = request.getAttribute("user");
        return user instanceof Map<?, ?> ? (Map<String, Object>) user : Collections.emptyMap();
    }
}
