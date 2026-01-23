package com.codecool.clutchmind.service;

import com.codecool.clutchmind.ai.prompts.GeminiPrompts;
import com.codecool.clutchmind.dto.DecisionResponseDto;
import com.codecool.clutchmind.dto.ScenarioQueryDto;
import com.codecool.clutchmind.dto.ScenarioSummaryDto;
import com.codecool.clutchmind.model.PossessionEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

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
        ScenarioQueryDto query = extractQuery(userInput);

        List<PossessionEvent> similar = scenarioService.findSimilar(
                query.period(),
                query.minTime(),
                query.maxTime(),
                query.minScore(),
                query.maxScore(),
                query.targetTime(),
                query.targetScore()
        );

        return generateRecommendation(userInput, similar);
    }

    private ScenarioQueryDto extractQuery(String userInput) {
        String prompt = GeminiPrompts.extractScenarioQueryPrompt(userInput);
        String raw = geminiService.recommend(prompt);
        String clean = stripCodeFences(raw);

        try {
            return objectMapper.readValue(clean, ScenarioQueryDto.class);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid scenario query JSON: " + clean, e);
        }
    }

    private DecisionResponseDto generateRecommendation(String userInput, List<PossessionEvent> similar) {
        String prompt = GeminiPrompts.recommendationPromptFromSimilar(similar, userInput);
        String raw = geminiService.recommend(prompt);
        String clean = stripCodeFences(raw);

        try {
            return objectMapper.readValue(clean, DecisionResponseDto.class);
        } catch (Exception e) {
            throw new IllegalStateException("Invalid recommendation JSON: " + clean, e);
        }
    }

    private String stripCodeFences(String text) {
        if (text == null) return "";
        return text.replace("```json", "").replace("```", "").trim();
    }


}
