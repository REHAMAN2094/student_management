package com.rehaman.backend.exception;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({
            IllegalArgumentException.class,
            MethodArgumentNotValidException.class,
            DuplicateKeyException.class,
            RuntimeException.class
    })
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleBadRequest(Exception exception) {
        String message = exception.getMessage() == null ? "Bad request" : exception.getMessage();
        return Map.of("message", message);
    }
}
