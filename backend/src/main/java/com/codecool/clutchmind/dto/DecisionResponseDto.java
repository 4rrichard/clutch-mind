package com.codecool.clutchmind.dto;

import java.util.List;

public record DecisionResponseDto(
        String summary,
        List<DecisionDto> recommendations
) {}
