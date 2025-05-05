package com.jpa.gamemaxxing_backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpa.gamemaxxing_backend.model.Game;
import com.jpa.gamemaxxing_backend.repository.GameRepository;
import com.jpa.gamemaxxing_backend.model.Game;
import com.jpa.gamemaxxing_backend.repository.GameRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:sqlite:file:./test-games.db?mode=memory&cache=shared",
        "spring.datasource.driver-class-name=org.sqlite.JDBC",
        "spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect",
        "spring.jpa.hibernate.ddl-auto=update",
        "gamemaxxing.admin-token=admin-secret-token-123"
})
public class GameControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Game testGame;

    @BeforeEach
    void setUp() {
        gameRepository.deleteAll();
        testGame = new Game();
        testGame.setTitle("Test Game");
        testGame.setDescription("A test game description");
        testGame.setGameUrl("https://example.com/game");
        testGame.setThumbnailUrl("https://example.com/thumbnail.jpg");
        testGame.setTags("test,fun");
        testGame.setCreatedAt(LocalDateTime.now());
    }

    @Test
    void testGetAllGames() throws Exception {
        gameRepository.save(testGame);

        mockMvc.perform(get("/api/games")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].title", is("Test Game")))
                .andExpect(jsonPath("$[0].description", is("A test game description")));
    }

    @Test
    void testGetGameById() throws Exception {
        Game savedGame = gameRepository.save(testGame);

        mockMvc.perform(get("/api/games/" + savedGame.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Test Game")))
                .andExpect(jsonPath("$.gameUrl", is("https://example.com/game")));
    }

    @Test
    void testGetGameByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/games/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testAddGameWithValidToken() throws Exception {
        mockMvc.perform(post("/api/admin/games")
                        .header("Authorization", "admin-secret-token-123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testGame)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Test Game")))
                .andExpect(jsonPath("$.description", is("A test game description")));

        List<Game> games = gameRepository.findAll();
        assert games.size() == 1;
        assert games.get(0).getTitle().equals("Test Game");
    }

    @Test
    void testAddGameWithInvalidToken() throws Exception {
        mockMvc.perform(post("/api/admin/games")
                        .header("Authorization", "wrong-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testGame)))
                .andExpect(status().isForbidden());
    }

    @Test
    void testUpdateGameWithValidToken() throws Exception {
        Game savedGame = gameRepository.save(testGame);
        Game updatedGame = new Game();
        updatedGame.setTitle("Updated Game");
        updatedGame.setDescription("Updated description");
        updatedGame.setGameUrl("https://example.com/updated-game");
        updatedGame.setThumbnailUrl("https://example.com/updated-thumbnail.jpg");
        updatedGame.setTags("updated,test");

        mockMvc.perform(put("/api/admin/games/" + savedGame.getId())
                        .header("Authorization", "admin-secret-token-123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedGame)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title", is("Updated Game")))
                .andExpect(jsonPath("$.description", is("Updated description")));

        Game gameFromDb = gameRepository.findById(savedGame.getId()).orElse(null);
        assert gameFromDb != null;
        assert gameFromDb.getTitle().equals("Updated Game");
    }

    @Test
    void testUpdateGameWithInvalidToken() throws Exception {
        Game savedGame = gameRepository.save(testGame);

        mockMvc.perform(put("/api/admin/games/" + savedGame.getId())
                        .header("Authorization", "wrong-token")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testGame)))
                .andExpect(status().isForbidden());
    }

    @Test
    void testDeleteGameWithValidToken() throws Exception {
        Game savedGame = gameRepository.save(testGame);

        mockMvc.perform(delete("/api/admin/games/" + savedGame.getId())
                        .header("Authorization", "admin-secret-token-123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        assert gameRepository.findById(savedGame.getId()).isEmpty();
    }

    @Test
    void testDeleteGameWithInvalidToken() throws Exception {
        Game savedGame = gameRepository.save(testGame);

        mockMvc.perform(delete("/api/admin/games/" + savedGame.getId())
                        .header("Authorization", "wrong-token")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isForbidden());

        assert gameRepository.findById(savedGame.getId()).isPresent();
    }
}