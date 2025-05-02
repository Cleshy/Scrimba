import { useEffect } from "react";

export default function useWinCheck({
  letters,
  currentWord,
  setIsGameRunning,
  setShowMessage,
}) {
  useEffect(() => {
    const uniqueLettersInWord = new Set(currentWord.split(""));

    const guessedLetters = letters
      .filter((letter) => letter.status === "correct")
      .map((letter) => letter.value);

    const uniqueGuessedLetters = new Set(guessedLetters);

    const currentWordLetters = Array.from(uniqueLettersInWord).sort().join("");
    const guessedWordLetters = Array.from(uniqueGuessedLetters)
      .sort()
      .join("")
      .toLowerCase();

    if (currentWordLetters === guessedWordLetters) {
      setIsGameRunning(false);
      setShowMessage({ text: "You win!", type: "win", show: true });
    }
  }, [letters, currentWord, setIsGameRunning, setShowMessage]);
}
