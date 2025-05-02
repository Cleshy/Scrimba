import { useCallback } from "react";

export default function useLetterPickHandler({
  currentWord,
  setAttempts,
  setLetters,
}) {
  return useCallback(
    (id, value) => {
      const isCorrect = currentWord.toUpperCase().includes(value);

      if (!isCorrect) {
        setAttempts((prev) => prev + 1);
      }

      setLetters((prevLetters) =>
        prevLetters.map((letter) =>
          letter.id === id
            ? { ...letter, status: isCorrect ? "correct" : "wrong" }
            : letter
        )
      );
    },
    [currentWord, setAttempts, setLetters]
  );
}
