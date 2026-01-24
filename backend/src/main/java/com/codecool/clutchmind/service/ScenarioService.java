package com.codecool.clutchmind.service;

import com.codecool.clutchmind.model.PossessionEvent;
import com.codecool.clutchmind.repository.PossessionJdbcRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScenarioService {

        private final PossessionJdbcRepository possessionJdbcRepository;

        public ScenarioService(PossessionJdbcRepository possessionJdbcRepository) {
            this.possessionJdbcRepository = possessionJdbcRepository;
        }

    public List<PossessionEvent> findSimilar(
            int period,
            int minTime,
            int maxTime,
            int minScore,
            int maxScore,
            int targetTime,
            int targetScore
    ) {
        return possessionJdbcRepository.findSimilar(period, minTime, maxTime, minScore, maxScore, targetTime, targetScore);
    }

}
