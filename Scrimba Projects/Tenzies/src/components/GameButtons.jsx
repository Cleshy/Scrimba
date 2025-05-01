import React from "react";

function GameButtons({
  isGameWon,
  isGameRunning,
  handleGameReset,
  handleDieRolls,
}) {
  const buttonText = isGameRunning
    ? "Roll"
    : isGameWon
    ? "New Game"
    : "Start Game";

  return (
    <div className="game-buttons-container">
      <button className="btn" onClick={handleDieRolls}>
        {buttonText}
      </button>
      {!isGameWon && isGameRunning && (
        <button className="btn btn-reset" onClick={handleGameReset}>
          Reset
        </button>
      )}
    </div>
  );
}

export default React.memo(GameButtons);
