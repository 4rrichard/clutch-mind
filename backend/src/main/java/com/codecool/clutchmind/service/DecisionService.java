package com.codecool.clutchmind.service;

import com.codecool.clutchmind.ai.prompts.GeminiPrompts;
import com.codecool.clutchmind.dto.DecisionResponseDto;
import com.codecool.clutchmind.dto.ScenarioSummaryDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class DecisionService {

    private final ScenarioService scenarioService;
    private final GeminiService geminiService;
    private final ObjectMapper objectMapper;

    public DecisionService(ScenarioService scenarioService, GeminiService geminiService, ObjectMapper objectMapper) {
        this.scenarioService = scenarioService;
        this.geminiService = geminiService;
        this.objectMapper = objectMapper;
    }

    public DecisionResponseDto recommend(String userInput) {
        ScenarioSummaryDto scenario = scenarioService.getSampleScenario();

        String prompt = GeminiPrompts.recommendationPrompt(
                scenario,
                userInput
        );

        String raw = geminiService.recommend(prompt);

        String clean = raw.replace("```json", "").replace("```", "").trim();
        clean = clean.replaceAll("(\\])\\s*[A-Za-z]+\\s*([,}])", "$1$2");

        try {
            return objectMapper.readValue(clean, DecisionResponseDto.class);
        } catch (Exception e) {
            throw new IllegalStateException("Gemini returned invalid JSON: " + clean, e);
        }
    }
}
