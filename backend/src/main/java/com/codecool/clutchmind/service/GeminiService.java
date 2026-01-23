package com.codecool.clutchmind.service;

import com.codecool.clutchmind.ai.prompts.GeminiPrompts;
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

    public String recommend(String prompt) {
        int attempts = 2;

        for (int i = 1; i <= attempts; i++) {
            try {
                GenerateContentResponse response = client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );
                return response.text();

            } catch (com.google.genai.errors.ServerException e) {

                if (i == attempts) {
                    throw e;
                }
                try {
                    Thread.sleep(600);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw e;
                }
            }
        }

        throw new IllegalStateException("Unreachable");
    }

}
