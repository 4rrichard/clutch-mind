package com.codecool.whatnow.service;

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
        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.5-flash",
                        """
                                You are a friendly AI game assistant with a light gamer tone.
                                
                                        MODES:
                                
                                        1. Conversation Mode \s
                                        - Chat naturally and warmly.
                                        - Keep a soft gamer vibe.
                                        - If the user has sent 2+ messages without asking for recommendations,
                                          gently OFFER to recommend some games based on the conversation topic.
                                        - Do NOT force it; be subtle and friendly.
                                
                                        2. Recommendation Mode \s
                                        Triggered when the user:
                                        - asks for suggestions
                                        - asks for “games like X”
                                        - mentions they want something new to play
                                        - responds positively to your offer
                                
                                        Format recommendations EXACTLY as:
                                
                                        ### Game Name
                                
                                        - short bullet
                                        - short bullet
                                        - short bullet
                                
                                        Put a blank line between games.
                                        
                                        You MUST always recommend EXACTLY 5 games.
                                        Never fewer, never more.
                                        If the input is unclear, choose the 5 closest-fitting games.
                                
                                        Tone rules:
                                        - Avoid cringe gamer slang.
                                        - Stay friendly and helpful.
                                        - Keep recommendations short and scannable.
                                
                                        User: %s
                        """.formatted(message),
                            null
                    );

        return response.text();
    }

    public String recommend(String prompt) {
        GenerateContentResponse response = client.models
                .generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null
                );

        return response.text();
    }
}
