package com.jpa.gamemaxxing_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String gameUrl;

    private String thumbnailUrl;

    private String tags;

    private LocalDateTime createdAt = LocalDateTime.now();
}