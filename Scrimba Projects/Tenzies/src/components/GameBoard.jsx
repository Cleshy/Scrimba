import React, { useEffect, useState, useCallback } from "react";
import Die from "./Die";
import GameButtons from "./GameButtons";
import GameStats from "./GameStats";
import useGameState from "../hooks/useGameState";
GameStats;

export default function GameBoard({ setShowConfetti }) {
  const {
    dice,
    rollCount,
    isGameRunning,
    isGameWon,
    timer,
    handleDieHold,
    handleDieRolls,
    handleGameReset,
  } = useGameState(setShowConfetti);

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleDieHold={handleDieHold}
      />
    );
  });

  return (
    <>
      <div className="die-container">{diceElements}</div>
      <GameButtons
        isGameWon={isGameWon}
        isGameRunning={isGameRunning}
        handleGameReset={handleGameReset}
        handleDieRolls={handleDieRolls}
      />
      <GameStats timer={timer} rollCount={rollCount} />
    </>
  );
}
