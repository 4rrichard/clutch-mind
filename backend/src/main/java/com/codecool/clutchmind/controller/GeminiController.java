package com.codecool.whatnow.controller;

import com.codecool.whatnow.service.GeminiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {
    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {

        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        return geminiService.chat(message);
    }

    @PostMapping("/recommend")
    public String recommend(@RequestBody String userInput) {

        return geminiService.recommend(userInput);
    }
}
