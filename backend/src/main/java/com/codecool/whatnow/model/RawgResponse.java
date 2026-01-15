package com.codecool.whatnow.model;

import java.util.List;

public record RawgResponse(
        List<RawgGame> results
) {}

