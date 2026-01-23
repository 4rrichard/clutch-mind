package com.codecool.clutchmind.controller;

import com.codecool.clutchmind.dto.DecisionRequestDto;
import com.codecool.clutchmind.dto.DecisionResponseDto;
import com.codecool.clutchmind.service.DecisionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/decision")
public class DecisionController {

    private final DecisionService decisionService;

    public DecisionController(DecisionService decisionService) {
        this.decisionService = decisionService;
    }

    @PostMapping("/recommend")
    public DecisionResponseDto recommend(@RequestBody DecisionRequestDto req) {
        return decisionService.recommend(req.userInput());
    }
}
