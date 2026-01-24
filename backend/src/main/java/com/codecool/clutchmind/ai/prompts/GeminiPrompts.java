package com.codecool.clutchmind.ai.prompts;

public final class GeminiPrompts {

    private GeminiPrompts() {}

    public static String recommendationPromptFromSimilar(String similarJson, String userInput) {

        return """
You are a basketball decision-support assistant.

You are given a list of historical clutch possessions similar to the user's situation.

Similar possessions (JSON array, up to 50):
%s

User message:
%s

Task:
- Recommend exactly 5 on-court basketball decisions that fit the user's situation.
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

If the JSON array is empty, note in your reasoning that there are no historical matches and base your recommendations on general best practice for this situation.
""".formatted(similarJson, userInput == null ? "" : userInput);
    }


    public static String extractScenarioQueryPrompt(String userInput) {
        return """
    You are an information extractor for a basketball scenario search.
    
    Task:
    - Convert the user's message into a structured scenario query for a clutch-possession database.
    - Output ONLY valid JSON (no markdown, no backticks, no extra text).
    
    Defaults (use if missing):
    - period: 4
    - targetTime: 15
    - minTime: 0
    - maxTime: 30
    - targetScore: 0
    - minScore: -3
    - maxScore: 3
    
    Rules:
    - "down by N" => targetScore = -N
    - "up by N" => targetScore = +N
    - "tied" => targetScore = 0
    - "X seconds left" => targetTime = X
    - "MM:SS left" => targetTime = MM*60 + SS
    - If user mentions Q1/Q2/Q3/Q4 => period accordingly, otherwise keep default.
    
    Output JSON format:
    {
      "period": 4,
      "minTime": 0,
      "maxTime": 30,
      "minScore": -3,
      "maxScore": 3,
      "targetTime": 15,
      "targetScore": 0
    }
    
    User message:
    %s
    """.formatted(userInput == null ? "" : userInput);
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