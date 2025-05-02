import React, { useEffect, useState } from "react";
import {
  letters as lettersData,
  words as wordsData,
  languages as langs,
} from "./../utils";
import { nanoid } from "nanoid";
import Message from "./Message";
import Languages from "./Languages";
import InputFields from "./InputFields";
import Letters from "./Letters";

function getLetters() {
  return lettersData.map((letter) => {
    return { id: nanoid(), value: letter, status: undefined };
  });
}

function getCurrentWord() {
  const randomNumber = Math.ceil(Math.random() * wordsData.length);
  return wordsData[randomNumber];
}

function getLanguages() {
  return langs.map((lang) => {
    return { id: nanoid(), value: lang };
  });
}

const farewellMessages = {
  HTML: "Looks like your structure collapsed! 🧱",
  CSS: "Style gone wild! No more colors for you. 🎨",
  JavaScript: "The logic broke. Undefined behavior! 🧠",
  React: "No more components to mount. 😵",
  TypeScript: "Strong types couldn't save you. ☠️",
  Node: "The server crashed... forever. 💀",
  Python: "Something slipped in the whitespace... but you're still alive. 🐍",
  Ruby: "No gems left to rescue you. 💎",
  Assembly: "You’ve reached the bare metal. 💾",
};

export default function GameBoard() {
  // Nyomon kell követni, hogy a játék folyamatvan van vagy sem.
  const [isGameRunning, setIsGameRunning] = useState(true);
  // El kell dönteni, hogy mikor legyen látható az üzenet
  const [showMessage, setShowMessage] = useState({
    text: "",
    type: "",
    show: false,
  });
  // Be kell állítani a betűket amikor betölt a komponens
  const [letters, setLetters] = useState(() => getLetters());
  // Nyomon kell követni, hogy hány próbálkozás volt
  const [attempts, setAttempts] = useState(0);
  // Kell egy új kitalálandó szót beállítani
  const [currentWord, setCurrentWord] = useState(() => getCurrentWord());
  // Be kell tölteni a programozási nyelveket
  const [languages, setLanguages] = useState(() => getLanguages());

  useEffect(() => {
    if (attempts >= 8) {
      setIsGameRunning(false);
      setShowMessage({ text: "Game Over!", type: "lost", show: true });
    } else if (attempts > 0 && attempts < 8) {
      const currentLanguage = languages[attempts - 1].value;
      const currentMessage = farewellMessages[currentLanguage];
      setShowMessage({ text: currentMessage, type: "custom", show: true });
    }
  }, [attempts]);

  useEffect(() => {
    const uniqueLettersInWord = new Set(currentWord.split(""));

    const guessedLetters = letters
      .filter((letter) => {
        return letter.status === "correct";
      })
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
  }, [letters, currentWord]);

  function handleLetterPick(id, value) {
    const isCorrect = currentWord.toUpperCase().includes(value);

    if (!isCorrect) {
      setAttempts((prevAttempts) => prevAttempts + 1);
    }

    setLetters((prevLetters) =>
      prevLetters.map((letter) => {
        if (letter.id === id) {
          return isCorrect
            ? { ...letter, status: "correct" }
            : { ...letter, status: "wrong" };
        }

        return letter;
      })
    );
  }

  function resetGame() {
    setIsGameRunning(true);
    setAttempts(0);
    setLetters(() => getLetters());
    setLanguages(() => getLanguages());
    setCurrentWord(() => getCurrentWord());
    setShowMessage({ type: "", show: false });
  }

  return (
    <>
      <Message farewellMessages={farewellMessages} showMessage={showMessage} />
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
