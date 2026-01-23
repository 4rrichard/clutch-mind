package com.codecool.clutchmind.controller;

import com.codecool.clutchmind.dto.ScenarioSummaryDto;
import com.codecool.clutchmind.service.ScenarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ScenarioController {

    private final ScenarioService scenarioService;

    public ScenarioController(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    @GetMapping("/api/scenario/count")
    public Map<String, Integer> count() {
        return Map.of("rows", scenarioService.getRowCount());
    }

    @GetMapping("/api/scenario/sample")
    public ScenarioSummaryDto sample() {
        return scenarioService.getSampleScenario();
    }
}
