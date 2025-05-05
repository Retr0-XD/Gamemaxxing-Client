package com.jpa.gamemaxxing_backend.repository;

import com.jpa.gamemaxxing_backend.model.Game;

import com.jpa.gamemaxxing_backend.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}