import { useState, useCallback } from "react";
import {
  letters as lettersData,
  words as wordsData,
  languages as langs,
  farewellMessages,
} from "../utils/data";
import { nanoid } from "nanoid";

function generateLetters() {
  return lettersData.map((letter) => ({
    id: nanoid(),
    value: letter,
    status: undefined,
  }));
}

function generateWord() {
  const index = Math.floor(Math.random() * wordsData.length);
  return wordsData[index];
}

function generateLanguages() {
  return langs.map((lang) => ({
    id: nanoid(),
    value: lang,
  }));
}

export default function useGameState() {
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [showMessage, setShowMessage] = useState({
    text: "",
    type: "",
    show: false,
  });
  const [letters, setLetters] = useState(() => generateLetters());
  const [attempts, setAttempts] = useState(0);
  const [currentWord, setCurrentWord] = useState(() => generateWord());
  const [languages, setLanguages] = useState(() => generateLanguages());

  // Új játék újraindítása egy helyről
  const resetGame = useCallback(() => {
    setIsGameRunning(true);
    setAttempts(0);
    setLetters(generateLetters());
    setLanguages(generateLanguages());
    setCurrentWord(generateWord());
    setShowMessage({ text: "", type: "", show: false });
  }, []);

  return {
    isGameRunning,
    setIsGameRunning,
    showMessage,
    setShowMessage,
    letters,
    setLetters,
    attempts,
    setAttempts,
    currentWord,
    setCurrentWord,
    languages,
    setLanguages,
    farewellMessages,
    resetGame,
  };
}
