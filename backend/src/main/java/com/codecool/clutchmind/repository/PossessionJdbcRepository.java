package com.codecool.clutchmind.repository;

import com.codecool.clutchmind.model.PossessionEvent;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PossessionJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public PossessionJdbcRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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
        String sql = """
            SELECT endtime, events, fg2a, fg2m, fg3a, fg3m,
                   gamedate, gameid, nonshootingfoulsthatresultedinfts,
                   offensiverebounds, opponent, period, shootingfoulsdrawn,
                   startscoredifferential, starttime, starttype,
                   turnovers, description, url
            FROM public.possessions
            WHERE period = ?
              AND start_time_sec BETWEEN ? AND ?
              AND startscoredifferential BETWEEN ? AND ?
            ORDER BY ABS(start_time_sec - ?),
                     ABS(startscoredifferential - ?)
            LIMIT 50
        """;

        return jdbcTemplate.query(
                sql,
                (rs, rowNum) -> new PossessionEvent(
                        rs.getString("endtime"),
                        rs.getString("events"),
                        rs.getInt("fg2a"),
                        rs.getInt("fg2m"),
                        rs.getInt("fg3a"),
                        rs.getInt("fg3m"),
                        rs.getString("gamedate"),
                        rs.getLong("gameid"),
                        rs.getInt("nonshootingfoulsthatresultedinfts"),
                        rs.getInt("offensiverebounds"),
                        rs.getString("opponent"),
                        rs.getInt("period"),
                        rs.getInt("shootingfoulsdrawn"),
                        rs.getInt("startscoredifferential"),
                        rs.getString("starttime"),
                        rs.getString("starttype"),
                        rs.getInt("turnovers"),
                        rs.getString("description"),
                        rs.getString("url")
                ),
                period, minTime, maxTime, minScore, maxScore, targetTime, targetScore
        );
    }
}
