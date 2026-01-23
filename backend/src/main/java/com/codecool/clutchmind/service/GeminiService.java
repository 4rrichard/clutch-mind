package com.codecool.whatnow.service;

import com.codecool.whatnow.ai.prompts.GeminiPrompts;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    private final Client client;

    public GeminiService(@Value("${gemini.api.key}") String apiKey) {
        this.client = Client.builder()
                .apiKey(apiKey)
                .build();
    }

    public String chat(String message) {
        String prompt = GeminiPrompts.chatPrompt(message);
        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                prompt,
                null
        );

        return response.text();
    }

    public String recommend(String userInput) {
        String prompt = GeminiPrompts.recommendationPrompt(userInput);
        GenerateContentResponse response = client.models
                .generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}
