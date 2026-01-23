package com.codecool.clutchmind.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "possessions", schema = "public")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PossessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endtime;

    @Column(columnDefinition = "TEXT")
    private String events;

    private int fg2a;
    private int fg2m;
    private int fg3a;
    private int fg3m;

    private String gamedate;
    private long gameid;

    @Column(name = "nonshootingfoulsthatresultedinfts")
    private int nonShootingFoulsThatResultedInFts;

    private int offensiverebounds;
    private String opponent;
    private int period;
    private int shootingfoulsdrawn;
    private int startscoredifferential;
    private String starttime;
    private String starttype;
    private int turnovers;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String url;

    @Column(name = "start_time_sec")
    private int startTimeSec;

    @Column(name = "end_time_sec")
    private int endTimeSec;
}
