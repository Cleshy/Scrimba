import * as config from "./config.js";

const root = document.documentElement;
const createScheme = document.getElementById("create-scheme");

const colorContainer = document.getElementById("color-container");
const colorElements = document.querySelectorAll(".color");
const copyElements = document.querySelectorAll(".copy-color");

const logo = document.getElementById("logo");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.classList.add("dark-mode");
}

function setMode() {
  const currentMode = localStorage.getItem("mode");
  if (currentMode === "dark") {
    root.classList.add("dark-mode");
  } else {
    root.classList.remove("dark-mode");
  }

  const modeToggler = document.getElementById("mode-toggler");
  const sunIcon = document.querySelector(".fa-sun");
  const moonIcon = document.querySelector(".fa-moon");

  modeToggler.addEventListener("click", () => {
    const currentMode = localStorage.getItem("mode");
    if (currentMode === "dark") {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
      localStorage.setItem("mode", "light");
      root.classList.remove("dark-mode");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
      localStorage.setItem("mode", "dark");
      root.classList.add("dark-mode");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init() {
  handleModal();
  handleLoadingWindowWidth();
  setStartingColors();
  setMode();
}

function handleLoadingWindowWidth() {
  if (window.innerWidth >= 768) {
    logo.classList.remove("hidden");
    createScheme.textContent = "Create a color scheme";
  }
}

function getColorPalette() {
  const selectedScheme = document.getElementById("select-scheme").value;
  const pickedColor = document.getElementById("color-picker").value;
  const color = pickedColor.slice(1);

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedScheme}&count=5`
  )
    .then((response) => response.json())
    .then((colorPalette) => renderColors(colorPalette.colors));
}

createScheme.addEventListener("click", getColorPalette);

function renderColors(fetchedColors) {
  fetchedColors.forEach((color, index) => {
    colorElements[index].style.backgroundColor = color.hex.value;
    copyElements[index].innerHTML =
      color.hex.value + `<i class="copy fa-solid fa-copy">`;
  });
}

function handleColorCopy() {
  colorContainer.addEventListener("click", (e) => {
    const target = e.target.closest(".copy-color");
    if (target) {
      const originalText = target.textContent;
      navigator.clipboard.writeText(originalText).then(() => {
        target.innerHTML =
          "Copied!" + `<i class="fa-solid fa-check copy checkmark"></i>`;

        setTimeout(() => {
          target.innerHTML = `${originalText} <i class="copy fa-solid fa-copy"></i></ion-icon>`;
        }, 2000);
      });
    }
  });
}

handleColorCopy();

document.getElementById("modal-btn").addEventListener("click", (e) => {
  document.getElementById("modal-container").classList.add("hidden");
});

function handleModal() {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-btn")) {
      document.getElementById("modal-container").classList.add("hidden");
    }
  });
}

function setStartingColors() {
  colorElements.forEach((colorEl, index) => {
    const currentColor = config.generateNewColor();
    colorEl.style.backgroundColor = currentColor;
    copyElements[
      index
    ].innerHTML = `${currentColor} <i class="copy fa-solid fa-copy"></i>`;
  });
}
