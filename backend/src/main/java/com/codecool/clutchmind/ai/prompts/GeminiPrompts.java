package com.codecool.clutchmind.ai.prompts;

import com.codecool.clutchmind.dto.ScenarioSummaryDto;

public final class GeminiPrompts {

    private GeminiPrompts() {}

    public static String recommendationPrompt(ScenarioSummaryDto s, String userInput) {
        return """
    You are a basketball decision-support assistant.

    Scenario from historical clutch possession data:
    - Period: %d
    - Time window: %s to %s
    - Start type: %s
    - Score differential at start: %d (negative = trailing)
    - Outcome label: %s
    - Stats: 2PT %d/%d, 3PT %d/%d, TO=%d, OREB=%d, FoulsDrawn=%d

    Play-by-play:
    %s

    User note:
    %s

    Task:
    - Recommend exactly 5 on-court basketball decisions that fit THIS situation.
    - Output ONLY valid JSON (no markdown, no backticks, no extra text).

    JSON format:
    {
      "summary": "VERY short (max 60 characters). Headline-style. No commas.",
      "recommendations": [
        {
          "title": "Decision name",
          "summary": "Max 100 characters. Plain language.",
          "detailed": "2-5 sentences, practical reasoning",
          "confidence": "High|Medium|Low",
          "tags": ["Clutch", "≤5s", "Tight D"]
        }
      ]
    }

    Rules:
    - Exactly 5 items in "recommendations"
    - No player names unless the user mentioned them
    - Tags must be 2–4 short items
    """.formatted(
                s.period(),
                s.starttime(), s.endtime(),
                s.starttype(),
                s.startscoredifferential(),
                s.outcome(),
                s.fg2m(), s.fg2a(),
                s.fg3m(), s.fg3a(),
                s.turnovers(),
                s.offensiverebounds(),
                s.shootingfoulsdrawn(),
                s.events(),
                userInput == null ? "" : userInput
        );
    }


    public static String chatPrompt(String userMessage) {
        return """
            You are a basketball assistant with an analytical but friendly tone.

            Behavior rules:
            - Answer questions clearly and practically.
            - Explain basketball decisions and concepts.
            - Stay focused on basketball strategy and decision-making.
            - Do NOT recommend items in lists unless the user explicitly asks.
            - Avoid slang and hype language.

            If the user asks "why" or "compare", explain reasoning step by step.
            If the user is vague, ask ONE short clarifying question.

            User:
            %s
            """.formatted(userMessage);
    }
}