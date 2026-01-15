package com.codecool.whatnow.dto;

import java.util.List;

public record GameDto(
        int id,
        String title,
        String image,
        Double rating,
        List<String> platforms
) {}
