let btnStart = document.querySelector(".btn-start");
let btnHit = document.querySelector(".btn-hit");
let btnStand = document.querySelector(".btn-stand");
let btnNewGame = document.querySelector(".btn-new");
let btnReset = document.querySelector(".btn-reset");
let messageEl = document.querySelector(".message");
let playerNumbersEl = document.querySelector(".player-numbers");
let dealerNumbersEl = document.querySelector(".dealer-numbers");
let walletEl = document.querySelector(".wallet");
let playerEl = document.querySelector(".player");
let dealerEl = document.querySelector(".dealer");

let playerSumEl = document.querySelector(".player-sum");
let dealerSumEl = document.querySelector(".dealer-sum");

let chips = 1000;

const MAX_DEALER_SUM = 17;
const BLACKJACK = 21;
const BET_AMOUNT = 50;
const WIN_AMOUNT = 100;

let playerNumbers = [];
let playerSum = 0;
let dealerNumbers = [];
let dealerSum = 0;

const messages = {
  0: "Do you want to draw a new card?",
  1: "You've got a Blackjack!",
  2: "Busted! You went over 21.",
  3: "Dealer has won. Better luck next time!",
  4: "Push! It's a tie, your bet has been returned.",
  5: "Congratulations! You win!",
};

function rndNumber() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;

  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function increaseChips() {
  chips += 50;
  walletEl.textContent = chips;
}

function decreaseChips() {
  chips -= 50;
  walletEl.textContent = chips;
}

function getStarterNumbers() {
  playerNumbers.push(rndNumber());
  playerNumbers.push(rndNumber());

  playerSum = playerNumbers[0] + playerNumbers[1];

  playerSumEl.textContent += " " + playerSum;

  dealerNumbers.push(rndNumber());
  dealerNumbers.push(rndNumber());

  dealerSum = dealerNumbers[0] + dealerNumbers[1];

  dealerSumEl.textContent += " " + dealerSum;

  setNumbers(playerNumbersEl, playerNumbers);
  setNumbers(dealerNumbersEl, dealerNumbers);
}

function setNumbers(element, numbers) {
  for (let i = 0; i < numbers.length; i++) {
    element.innerHTML += `<li>${numbers[i]}</li>`;
  }
}

function setGameButtons() {
  btnStart.classList.add("hidden");
  btnHit.classList.remove("hidden");
  btnStand.classList.remove("hidden");
}

function start() {
  playerEl.classList.add("current");
  getStarterNumbers();
  decreaseChips();
  setGameButtons();
  btnReset.classList.remove("hidden");

  if (dealerSum !== 21) {
    messageEl.textContent = messages[0];
  } else {
    messageEl.textContent = messages[3];
  }
}

function hit() {
  let newPlayerNumber = rndNumber();
  playerNumbers.push(newPlayerNumber);
  playerNumbersEl.innerHTML += `<li>${newPlayerNumber}</li>`;
  playerSum += newPlayerNumber;
  playerSumEl.textContent = `Player Sum: ${playerSum}`;

  if (playerSum > 21) {
    messageEl.textContent = messages[2];
    showNewGameButton();
  }
}

function stand() {
  playerEl.classList.remove("current");
  dealerEl.classList.add("current");
  while (dealerSum < 17) {
    let newDealerNumber = rndNumber();
    dealerNumbersEl.innerHTML += `<li>${newDealerNumber}</li>`;
    dealerSum += newDealerNumber;
  }
  dealerSumEl.textContent = `Dealer Sum: ${dealerSum}`;

  if (dealerSum > playerSum && dealerSum <= 21) {
    messageEl.textContent = messages[3];
    showNewGameButton();
  } else if (playerSum > dealerSum && dealerSum < 21) {
    messageEl.textContent = messages[5];
    showNewGameButton();
    chips += 100;
    walletEl.textContent = chips;
  } else if (playerSum === dealerSum) {
    messageEl.textContent = messages[4];
    increaseChips();
    walletEl.textContent = chips;
    showNewGameButton();
  } else {
    messageEl.textContent = messages[5];
    showNewGameButton();
    chips += 100;
    walletEl.textContent = chips;
  }
}

function showNewGameButton() {
  btnHit.classList.add("hidden");
  btnStand.classList.add("hidden");
  btnNewGame.classList.remove("hidden");
}

function setNewGame() {
  dealerEl.classList.remove("current");
  playerEl.classList.add("current");
  decreaseChips();
  playerNumbers.length = 0;
  playerSum = 0;
  dealerNumbers.length = 0;
  dealerSum = 0;
  playerNumbersEl.textContent = "";
  dealerNumbersEl.textContent = "";
  playerSumEl.textContent = "Player Sum:";
  dealerSumEl.textContent = "Dealer Sum:";
  btnHit.classList.remove("hidden");
  btnStand.classList.remove("hidden");
  btnNewGame.classList.add("hidden");
  messageEl.textContent = "";
  getStarterNumbers();
}

function reset() {
  playerEl.classList.remove("current");
  dealerEl.classList.remove("current");
  playerNumbersEl.textContent = "";
  dealerNumbersEl.textContent = "";
  playerSumEl.textContent = "Player Sum:";
  dealerSumEl.textContent = "Dealer Sum:";
  btnStart.classList.remove("hidden");
  btnHit.classList.add("hidden");
  btnStand.classList.add("hidden");
  btnNewGame.classList.add("hidden");
  btnReset.classList.add("hidden");
  playerNumbers.length = 0;
  playerSum = 0;
  dealerNumbers.length = 0;
  dealerSum = 0;
  chips = 1000;
  walletEl.textContent = chips;
}
