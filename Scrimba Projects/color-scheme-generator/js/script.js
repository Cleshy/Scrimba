import { generateHexColor } from './config.js';

const root = document.documentElement;
const logo = document.getElementById('logo');
const createSchemeBtn = document.getElementById('create-scheme');
const colorElements = document.querySelectorAll('.color');
const copyElements = document.querySelectorAll('.copy-color');

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  handleModal();
  handleLogoDisplay();
  setStartingColors();
  handleSchemeGenerating();
  handleColorCopy();
  setMode();
}

function handleModal() {
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-btn')) {
      document.getElementById('modal-container').classList.add('hidden');
    }
  });
}

function handleLogoDisplay() {
  const updateLogoVisibility = () => {
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
    logo.classList.toggle('hidden', !isLargeScreen);
    createSchemeBtn.textContent = isLargeScreen
      ? 'Create a color scheme'
      : 'Create';
  };

  updateLogoVisibility();
  window.addEventListener('resize', updateLogoVisibility);
}

function setStartingColors() {
  colorElements.forEach((colorEl, index) => {
    const color = generateHexColor();
    colorEl.style.backgroundColor = color;
    copyElements[
      index
    ].innerHTML = `${color} <i class="copy fa-solid fa-copy"></i>`;
  });
}

function handleSchemeGenerating() {
  createSchemeBtn.addEventListener('click', () => {
    const selectedScheme = document.getElementById('select-scheme').value;
    const pickedColor = document.getElementById('color-picker').value;
    const color = pickedColor.slice(1);

    fetch(
      `https://www.thecolorapi.com/scheme?hex=${color}&mode=${selectedScheme}&count=5`
    )
      .then((response) => response.json())
      .then((colorScheme) => renderColors(colorScheme.colors));
  });
}

function renderColors(fetchedColors) {
  fetchedColors.forEach((color, index) => {
    colorElements[index].style.backgroundColor = color.hex.value;
    copyElements[index].innerHTML =
      color.hex.value + `<i class="copy fa-solid fa-copy">`;
  });
}

function setMode() {
  const modeToggler = document.getElementById('mode-toggler');
  const sunIcon = document.querySelector('.fa-sun');
  const moonIcon = document.querySelector('.fa-moon');
  const isDarkMode = localStorage.getItem('mode') === 'dark';

  root.classList.toggle('dark-mode', isDarkMode);
  sunIcon.classList.toggle('hidden', !isDarkMode);
  moonIcon.classList.toggle('hidden', isDarkMode);

  modeToggler.addEventListener('click', () => {
    const newMode = root.classList.toggle('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', newMode);
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
  });
}

function handleColorCopy() {
  copyElements.forEach((copyEl) => {
    copyEl.addEventListener('click', () => {
      const originalText = copyEl.textContent;
      navigator.clipboard.writeText(originalText).then(() => {
        copyEl.innerHTML =
          'Copied!' + `<i class="fa-solid fa-check copy checkmark"></i>`;

        setTimeout(() => {
          copyEl.innerHTML = `${originalText} <i class="copy fa-solid fa-copy"></i></ion-icon>`;
        }, 2000);
      });
    });
  });
}
