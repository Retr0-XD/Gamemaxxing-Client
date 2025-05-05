package com.jpa.gamemaxxing_backend.service;

import com.jpa.gamemaxxing_backend.model.Game;
import com.jpa.gamemaxxing_backend.repository.GameRepository;
import com.jpa.gamemaxxing_backend.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(Long id) {
        return gameRepository.findById(id);
    }

    public Game addGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(Long id, Game gameDetails) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        game.setTitle(gameDetails.getTitle());
        game.setDescription(gameDetails.getDescription());
        game.setGameUrl(gameDetails.getGameUrl());
        game.setThumbnailUrl(gameDetails.getThumbnailUrl());
        game.setTags(gameDetails.getTags());
        return gameRepository.save(game);
    }

    public void deleteGame(Long id) {
        gameRepository.deleteById(id);
    }
}