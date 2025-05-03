let scoreButtons = document.querySelectorAll(".score-btn");
let scoreElements = document.querySelectorAll(".score");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-game");

let homeScore = 0;
let guestScore = 0;

function setInitialValues() {
  homeScore = 0;
  guestScore = 0;
  scoreElements.forEach((element) => {
    element.classList.remove("leader");
    element.textContent = 0;
  });
}

resetBtn.addEventListener("click", () => setInitialValues());

scoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.value === "1") {
      if (button.dataset.team === "home") {
        homeScore += 1;
        scoreElements[0].textContent = homeScore;
      } else {
        guestScore += 1;
        scoreElements[1].textContent = guestScore;
      }
    } else if (button.dataset.value === "2") {
      if (button.dataset.team === "home") {
        homeScore += 2;
        scoreElements[0].textContent = homeScore;
      } else {
        guestScore += 2;
        scoreElements[1].textContent = guestScore;
      }
    } else {
      if (button.dataset.team === "home") {
        homeScore += 3;
        scoreElements[0].textContent = homeScore;
      } else {
        guestScore += 3;
        scoreElements[1].textContent = guestScore;
      }
    }

    setCurrentLeader();
  });
});

function setCurrentLeader() {
  if (homeScore > guestScore) {
    scoreElements[0].classList.add("leader");
    scoreElements[1].classList.remove("leader");
  } else if (guestScore > homeScore) {
    scoreElements[1].classList.add("leader");
    scoreElements[0].classList.remove("leader");
  }
}

setInitialValues();
