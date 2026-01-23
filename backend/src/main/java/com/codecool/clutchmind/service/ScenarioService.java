package com.codecool.clutchmind.service;

import com.codecool.clutchmind.dto.ScenarioSummaryDto;
import com.codecool.clutchmind.model.Outcome;
import com.codecool.clutchmind.model.PossessionEvent;
import com.codecool.clutchmind.repository.PossessionJdbcRepository;
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

        private final PossessionJdbcRepository possessionJdbcRepository;

        public ScenarioService(PossessionJdbcRepository possessionJdbcRepository) {
            this.possessionJdbcRepository = possessionJdbcRepository;
        }

        public List<PossessionEvent> analyzeDemoScenario() {
            return possessionJdbcRepository.findSimilar(4, 0, 30, -3, 3, 15, 0);
        }

}
