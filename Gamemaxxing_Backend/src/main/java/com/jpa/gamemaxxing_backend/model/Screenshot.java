package com.jpa.gamemaxxing_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Screenshot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String imageUrl;

    private String caption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
}