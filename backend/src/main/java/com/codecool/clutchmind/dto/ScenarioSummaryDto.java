package com.codecool.clutchmind.dto;

import com.codecool.clutchmind.model.Outcome;

public record ScenarioSummaryDto(
        int gameid,
        String gamedate,
        String opponent,
        int period,
        String starttime,
        String endtime,
        String starttype,
        int startscoredifferential,

        int fg2a,
        int fg2m,
        int fg3a,
        int fg3m,
        int turnovers,
        int offensiverebounds,
        int shootingfoulsdrawn,

        Outcome outcome,
        String events
) {}
