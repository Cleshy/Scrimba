import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

function generateDie() {
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid(),
  };
}

function generateDice(count = 9) {
  return Array.from({ length: count }, generateDie);
}

export default function useGameState(setShowConfetti) {
  const [dice, setDice] = useState(() => generateDice());
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timer, setTimer] = useState(0);

  const isGameWon =
    dice.length > 0 &&
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (isGameWon) {
      setIsGameRunning(false);
      setShowConfetti(true);
    }
  }, [isGameWon, setShowConfetti]);

  useEffect(() => {
    let interval;
    if (isGameRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isGameRunning]);

  const handleDieHold = useCallback(
    (id) => {
      if (isGameRunning) {
        setDice((prevDice) =>
          prevDice.map((die) => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
          })
        );
      }
    },
    [isGameRunning]
  );

  const handleDieRolls = useCallback(() => {
    if (isGameWon) {
      setDice(generateDice());
      setShowConfetti(false);
      setRollCount(0);
      setIsGameRunning(false);
      setTimer(0);
    } else {
      setIsGameRunning(true);
      setRollCount((prev) => prev + 1);
      setShowConfetti(false);
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  }, [isGameWon, setShowConfetti]);

  const handleGameReset = useCallback(() => {
    setRollCount(0);
    setDice((prevDice) => prevDice.map((die) => ({ ...die, isHeld: false })));
    setTimer(0);
  }, []);

  return {
    dice,
    rollCount,
    isGameRunning,
    isGameWon,
    timer,
    handleDieHold,
    handleDieRolls,
    handleGameReset,
  };
}
