package com.codecool.whatnow.service;

import com.codecool.whatnow.dto.GameDto;
import com.codecool.whatnow.model.RawgGame;
import com.codecool.whatnow.model.RawgResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class RawgService {

    private final WebClient webClient;
    private final String apiKey;

    public RawgService(WebClient webClient, @Value("${rawg.api.key}") String apiKey) {
        this.webClient = webClient;
        this.apiKey = apiKey;
    }

    public List<RawgGame> fetchRawgGames(String query) {
        Mono<RawgResponse> response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/games")
                        .queryParam("key",apiKey)
                        .queryParam("search", query)
                        .queryParam("page_size", 5)
                        .build())
                .retrieve()
                .bodyToMono(RawgResponse.class);
        RawgResponse rawgResponse = response.block();

        assert rawgResponse != null;
        return rawgResponse.results();
    }

    private GameDto convertToDto(RawgGame game) {
        List<String> platforms = game.getPlatforms()
                .stream()
                .map(wrapper -> wrapper.getPlatform().getName())
                .toList();

        return new GameDto(
                game.getId(),
                game.getName(),
                game.getBackgroundImage(),
                game.getRating(),
                platforms
        );
    }

    public List<GameDto> getGames(String query) {
        List<RawgGame> rawGames = fetchRawgGames(query);

        return rawGames.stream()
                .limit(1)
                .map(this::convertToDto)
                .toList();
    }
}
