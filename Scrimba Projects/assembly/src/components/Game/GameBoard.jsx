import React, { useEffect } from "react";
import Message from "../UI/Message";
import Languages from "../UI/Languages";
import InputFields from "../UI/InputFields";
import Letters from "../UI/Letters";
import useGameState from "../../hooks/useGameState";
import useWinCheck from "../../hooks/useWinCheck";
import useMistakeTracker from "../../hooks/useMistakeTracker";
import useLetterPickHandler from "../../hooks/useLetterPickHandler";

export default function GameBoard() {
  const {
    isGameRunning,
    setIsGameRunning,
    showMessage,
    setShowMessage,
    letters,
    setLetters,
    attempts,
    setAttempts,
    currentWord,
    languages,
    farewellMessages,
    resetGame,
  } = useGameState();

  useMistakeTracker({
    attempts,
    languages,
    setIsGameRunning,
    setShowMessage,
    farewellMessages,
  });

  useWinCheck({
    letters,
    currentWord,
    setIsGameRunning,
    setShowMessage,
  });

  const handleLetterPick = useLetterPickHandler({
    currentWord,
    setAttempts,
    setLetters,
  });

  return (
    <>
      <Message showMessage={showMessage} />
      <Languages attempts={attempts} languages={languages} />
      <InputFields letters={letters} currentWord={currentWord} />
      <Letters
        isGameRunning={isGameRunning}
        letters={letters}
        handleLetterPick={handleLetterPick}
      />
      {!isGameRunning && (
        <button onClick={resetGame} className="btn-new-game">
          New Game
        </button>
      )}
    </>
  );
}
