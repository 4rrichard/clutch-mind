package com.codecool.whatnow.controller;

import com.codecool.whatnow.dto.GameDto;
import com.codecool.whatnow.service.RawgService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
//rename to rawgController
public class RecommendationController {

    private final RawgService rawgService;

    public RecommendationController(RawgService rawgService) {
        this.rawgService = rawgService;
    }

    @GetMapping("/api/recommend")
    public List<GameDto> recommend(@RequestParam(required = false) String recommendation) {
        if (recommendation == null || recommendation.isBlank()) {
            recommendation = "popular";
        }
        return rawgService.getGames(recommendation);
    }
}
