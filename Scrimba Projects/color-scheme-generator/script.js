let mode = "light";

const modeToggler = document.getElementById("mode-toggler");

modeToggler.addEventListener("click", () => {
  if (mode === "light") {
    mode = "dark";
    modeToggler.innerHTML = `<i class="toggle fa-solid fa-sun"></i>`;
  } else {
    mode = "light";
    modeToggler.innerHTML = `<i class="toggle fa-solid fa-moon"></i>`;
  }
});
