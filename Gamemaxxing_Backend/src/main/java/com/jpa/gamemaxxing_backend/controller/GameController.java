package com.jpa.gamemaxxing_backend.controller;

import com.jpa.gamemaxxing_backend.model.Game;
import com.jpa.gamemaxxing_backend.service.GameService;
import com.jpa.gamemaxxing_backend.model.Game;
import com.jpa.gamemaxxing_backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameService gameService;

    @Value("${gamemaxxing.admin-token}")
    private String adminToken;

    // Public endpoints
    @GetMapping("/games")
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @GetMapping("/games/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable Long id) {
        return gameService.getGameById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin endpoints
    @PostMapping("/admin/games")
    public ResponseEntity<Game> addGame(@RequestBody Game game, @RequestHeader("Authorization") String token) {
        if (!adminToken.equals(token)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(gameService.addGame(game));
    }

    @PutMapping("/admin/games/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable Long id, @RequestBody Game gameDetails, @RequestHeader("Authorization") String token) {
        if (!adminToken.equals(token)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(gameService.updateGame(id, gameDetails));
    }

    @DeleteMapping("/admin/games/{id}")
    public ResponseEntity<Void> deleteGame(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        if (!adminToken.equals(token)) {
            return ResponseEntity.status(403).build();
        }
        gameService.deleteGame(id);
        return ResponseEntity.ok().build();
    }
}