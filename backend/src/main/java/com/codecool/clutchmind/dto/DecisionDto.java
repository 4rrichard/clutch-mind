package com.codecool.clutchmind.dto;

import java.util.List;

public record DecisionDto(
        String title,
        String summary,
        String detailed,
        String confidence,
        List<String> tags
) {}
