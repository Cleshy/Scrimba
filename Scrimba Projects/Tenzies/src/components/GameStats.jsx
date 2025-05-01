import React from "react";

export default function GameStats({ rollCount, timer }) {
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <div className="game-stats-container">
      <p className="game-stat">
        Time: {minutes}:{seconds}
      </p>
      <p className="game-stat">Total rolls: {rollCount}</p>
    </div>
  );
}
