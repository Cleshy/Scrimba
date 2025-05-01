import React from "react";
import Die from "./Die";
import GameButtons from "./GameButtons";
import GameStats from "./GameStats";
GameStats;

export default function GameBoard() {
  return (
    <div>
      <Die />
      <GameButtons />
      <GameStats />
    </div>
  );
}
