package com.codecool.clutchmind.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PossessionEvent(
        String endtime,
        String events,
        int fg2a,
        int fg2m,
        int fg3a,
        int fg3m,
        String gamedate,
        long gameid,
        @JsonProperty("nonshootingfoulsthatresultedinfts")
        int nonShootingFoulsThatResultedInFts,
        int offensiverebounds,
        String opponent,
        int period,
        int shootingfoulsdrawn,
        int startscoredifferential,
        String starttime,
        String starttype,
        int turnovers,
        String description,
        String url
) {}
