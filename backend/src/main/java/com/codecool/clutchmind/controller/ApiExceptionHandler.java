package com.codecool.clutchmind.controller;

import com.google.genai.errors.ServerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ServerException.class)
    public ResponseEntity<Map<String, String>> handleGeminiOverload(ServerException e) {

        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("error", "AI is busy right now (model overloaded). Please try again in a moment."));
    }
}
