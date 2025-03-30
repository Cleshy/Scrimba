const modeToggler = document.getElementById("mode-toggler");
const root = document.documentElement;

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  root.classList.add("dark-mode");
}

modeToggler.addEventListener("click", () => {
  root.classList.toggle("dark-mode");

  if (root.classList.contains("dark-mode")) {
    modeToggler.innerHTML = `<i class="toggle fa-solid fa-sun"></i>`;
  } else {
    modeToggler.innerHTML = `<i class="toggle fa-solid fa-moon"></i>`;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    document.querySelector(".create-scheme").textContent =
      "Create a color scheme";
  } else {
    document.querySelector(".create-scheme").textContent = "Create";
  }
});
