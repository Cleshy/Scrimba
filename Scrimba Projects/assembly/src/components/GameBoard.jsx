import React from "react";
import { letters } from "./../utils";
import LetterButton from "./LetterButton";

export default function GameBoard() {
  return (
    <div>
      <div className="letter-container">
        {letters.map((letter) => (
          <LetterButton value={letter} />
        ))}
      </div>
    </div>
  );
}
