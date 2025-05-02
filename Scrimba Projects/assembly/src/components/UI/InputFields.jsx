export default function InputFields({ letters, currentWord }) {
  const characterElements = currentWord.split("").map((letter, index) => {
    const correctLetters = letters
      .filter((letter) => letter.status === "correct")
      .map((letter) => letter.value.toLowerCase());

    return (
      <input
        disabled={true}
        type="text"
        key={index}
        className="input-field"
        value={correctLetters.includes(letter) ? letter : ""}
      />
    );
  });

  return <div className="input-container">{characterElements}</div>;
}
