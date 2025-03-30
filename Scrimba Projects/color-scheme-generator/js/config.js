export const MAX_COLOR_COUNT = 5;
export const hexCharacters = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

export function getCharacter(index) {
  return hexCharacters[index];
}

export function generateNewColor() {
  let hexColor = "#";

  for (let i = 0; i < 6; i++) {
    const randomPosition = Math.floor(Math.random() * hexCharacters.length);
    hexColor += getCharacter(randomPosition);
  }

  return hexColor;
}

// https://www.freecodecamp.org/news/generate-colors-in-javascript/
