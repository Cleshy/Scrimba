const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

let btnGenerate = document.querySelector(".btn-generate");
let passwordButtons = document.querySelectorAll(".btn-pw");
let passwordTexts = document.querySelectorAll(".btn-pw-text");
let btnSetters = document.querySelectorAll(".btn-setter");
let pwLength = document.querySelector(".pw-length");
let checkboxElements = document.querySelectorAll(".checkBox");

const MIN_CHAR_LENGTH = 8;
const MAX_CHAR_LENGTH = 20;

let passwordLength = MIN_CHAR_LENGTH;

const charactersOptions = {
  symbols: true,
  numbers: true,
};

const copyPassword = () => {
  passwordButtons.forEach((passwordBtn) => {
    passwordBtn.addEventListener("click", (e) => {
      const button = e.target.closest(".btn-pw");
      const btnText = button.querySelector(".btn-pw-text").textContent;

      navigator.clipboard.writeText(btnText).then(() => {
        button.classList.add("copied");

        setTimeout(() => {
          button.classList.remove("copied");
        }, 1500);
      });
    });
  });
};

const checkCharactersOptions = () => {
  checkboxElements.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      charactersOptions[e.target.id] = !charactersOptions[e.target.id];
    });
  });
};

checkCharactersOptions();

const getPasswordCharacters = (charactersArray) => {
  if (!charactersOptions.symbols && !charactersOptions.numbers) {
    return charactersArray.filter((char) => /^[a-zA-Z]$/.test(char));
  } else if (!charactersOptions.symbols) {
    return charactersArray.filter((char) => /^[a-zA-Z0-9]$/.test(char));
  } else if (!charactersOptions.numbers) {
    return charactersArray.filter((char) => /^[a-zA-Z\W]$/.test(char));
  } else {
    return charactersArray;
  }
};

getPasswordCharacters(characters);

const setPasswordLength = () => {
  btnSetters.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.id === "decrease" && passwordLength > MIN_CHAR_LENGTH) {
        passwordLength--;
        setPasswordLengthText(passwordLength);
      } else if (btn.id === "increase" && passwordLength < MAX_CHAR_LENGTH) {
        passwordLength++;
        setPasswordLengthText(passwordLength);
      }
    });
  });
};

const setPasswordLengthText = (passwordLength) => {
  pwLength.textContent = passwordLength;
};

setPasswordLength();

const generateRandomNumber = (numberLength) => {
  return Math.floor(Math.random() * numberLength);
};

const generatePasswords = (charArray, charLength) => {
  let characters = getPasswordCharacters(charArray);
  const passwords = [[], []];

  while (
    passwords[0].length !== charLength &&
    passwords[1].length !== charLength
  ) {
    let randomNumber1 = generateRandomNumber(characters.length);
    let randomNumber2 = generateRandomNumber(characters.length);
    passwords[0].push(characters[randomNumber1]);
    passwords[1].push(characters[randomNumber2]);
  }

  return passwords;
};

const setPasswords = (passwordElements, passwords) => {
  passwordElements.forEach((pwEl, index) => {
    pwEl.textContent = passwords[index].join("");
  });
};

btnGenerate.addEventListener("click", () => {
  let passwords = generatePasswords(characters, passwordLength);
  setPasswords(passwordTexts, passwords);
});

document.addEventListener("DOMContentLoaded", copyPassword);
