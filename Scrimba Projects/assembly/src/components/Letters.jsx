import React from "react";

export default function Letters({ letters, handleLetterPick, isGameRunning }) {
  const alphabetElements = letters.map((letter) => {
    const { id, value, status } = letter;

    let className = "btn-letter";

    if (status === "correct") {
      className += " btn-letter-correct";
    } else if (status === "wrong") {
      className += " btn-letter-wrong";
    }

    return (
      <button
        key={id}
        className={className}
        onClick={() => handleLetterPick(id, value)}
        disabled={!isGameRunning}
      >
        {value}
      </button>
    );
  });
  return <div className="letter-container">{alphabetElements}</div>;
}
