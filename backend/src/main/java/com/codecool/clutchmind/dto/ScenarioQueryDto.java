package com.codecool.clutchmind.dto;

public record ScenarioQueryDto(
        int period,
        int minTime,
        int maxTime,
        int minScore,
        int maxScore,
        int targetTime,
        int targetScore
) {}
