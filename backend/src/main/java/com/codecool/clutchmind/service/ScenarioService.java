package com.codecool.clutchmind.service;

import com.codecool.clutchmind.dto.ScenarioSummaryDto;
import com.codecool.clutchmind.model.Outcome;
import com.codecool.clutchmind.model.PossessionEvent;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScenarioService {

    private final List<PossessionEvent> events;

    public ScenarioService(ObjectMapper objectMapper) {
        this.events = loadEvents(objectMapper);
    }

    private List<PossessionEvent> loadEvents(ObjectMapper objectMapper) {
        try {
            ClassPathResource resource = new ClassPathResource("data/scenario_clutch.json");
            try (InputStream is = resource.getInputStream()) {
                return objectMapper.readValue(is, new TypeReference<List<PossessionEvent>>() {});
            }
        } catch (Exception e) {
            throw new IllegalStateException("Failed to load scenario_clutch.json from resources", e);
        }
    }

    public int getRowCount() {
        return events.size();
    }

    public List<PossessionEvent> getAllEvents() {
        return events;
    }

    private String scenarioKey(PossessionEvent e) {
        return e.gameid() + "|" + e.period() + "|" + e.starttime() + "|" + e.endtime();
    }

    public ScenarioSummaryDto getSampleScenario() {
        if (events.isEmpty()) {
            throw new IllegalStateException("No events loaded.");
        }

        Map<String, PossessionEvent> firstRowPerScenario = new LinkedHashMap<>();

        for (PossessionEvent e : events) {
            firstRowPerScenario.putIfAbsent(scenarioKey(e), e);
        }

        PossessionEvent s = firstRowPerScenario.values().iterator().next();

        Outcome outcome = determineOutcome(s);

        return new ScenarioSummaryDto(
                s.gameid(),
                s.gamedate(),
                s.opponent(),
                s.period(),
                s.starttime(),
                s.endtime(),
                s.starttype(),
                s.startscoredifferential(),

                s.fg2a(),
                s.fg2m(),
                s.fg3a(),
                s.fg3m(),
                s.turnovers(),
                s.offensiverebounds(),
                s.shootingfoulsdrawn(),

                outcome,
                s.events() == null ? "" : s.events().trim()
        );
    }

    private Outcome determineOutcome(PossessionEvent s) {
        if (s.turnovers() > 0) return Outcome.TURNOVER;
        if (s.fg2m() + s.fg3m() > 0) return Outcome.SCORE;
        if (s.fg2a() + s.fg3a() > 0) return Outcome.MISS;
        return Outcome.OTHER;
    }

}
