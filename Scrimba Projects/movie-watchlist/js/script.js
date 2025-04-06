"use strict";

/* ==========================
   Global Variables
========================== */
const movieList = document.getElementById("movie-list");
const isWatchListPage = window.location.pathname.includes("watchlist.html");

/* ==========================
   Initialization
========================== */
document.addEventListener("DOMContentLoaded", () => {
  handleModeToggle();
  if (isWatchListPage) {
    loadWatchlist();
  } else {
    handleMoviesFetch();
  }
});

/* ==========================
   Dark Mode Toggle
========================== */
function handleModeToggle() {
  const toggler = document.getElementById("toggler");
  const moonIcon = document.querySelector(".moon-icon");
  const sunIcon = document.querySelector(".sun-icon");

  const enableDarkMode = () => {
    document.documentElement.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  };

  if (localStorage.getItem("dark-mode") === "enabled") {
    enableDarkMode();
  }

  toggler.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
}

/* ==========================
   Fetch Movies
========================== */
function handleMoviesFetch() {
  const searchInput = document.getElementById("search");
  const searchBtn = document.getElementById("btn-search");

  searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim()) {
      fetchMovies(searchInput.value.trim());
    } else {
      showMessage("Please enter a search term!", "error");
    }
  });
}

async function fetchMovies(searchInput) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=225a5039&s=${searchInput}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong! Please try again later!");
    }

    const moviesData = await response.json();
    if (moviesData.Response === "False") {
      showMessage(moviesData.Error, "error");
      showError();
    } else {
      renderMovies(moviesData.Search);
    }
  } catch (error) {
    showMessage("Failed to fetch movies. Please try again later.", "error");
    console.error(error);
  }
}

function showError() {
  movieList.innerHTML = `
    <div class="explore-container">
      <h2 class="explore-title">Unable to find what you’re looking for. Please try another search.</h2>
    </div>`;
}

/* ==========================
   Render Movies
========================== */
function renderMovies(movies) {
  const imagePromises = movies.map((movie) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = movie.Poster;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  });

  Promise.all(imagePromises).then(() => {
    let moviesHTML = "";

    movies.forEach((movie) => {
      moviesHTML += `
        <div class="movie">
          <img class="movie-img" src="${movie.Poster}" alt="${
        movie.Title
      } Poster" />
          <div class="movie-information">
            <div class="movie-tags">
              <span class="tag">${setFirstCharUpperCase(movie.Type)}</span>
              <span class="tag">${movie.Year}</span>
            </div>
            <h3 class="movie-title">${movie.Title}</h3>
            <button class="btn btn--read-more" data-id="${
              movie.imdbID
            }">Read More</button>
          </div>
        </div>`;
    });

    movieList.innerHTML = moviesHTML;

    const readMoreButtons = document.querySelectorAll(".btn--read-more");
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        document.body.classList.add("no-scroll");
        const movieId = button.getAttribute("data-id");
        fetchMovieDetails(movieId);
      });
    });
  });
}

/* ==========================
   Fetch Movie Details
========================== */
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=225a5039&i=${movieId}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong! Please try again later!");
    }

    const movieDetails = await response.json();
    renderMovieInfo(movieDetails);
  } catch (error) {
    showMessage(
      "Failed to fetch movie details. Please try again later.",
      "error"
    );
    console.error(error);
  }
}

function renderMovieInfo(movie) {
  const genres = formatGenres(movie.Genre);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <div class="container">
      <div class="modal-details">
        <img src="${movie.Poster}" alt="${movie.Title} Poster" />
        <div class="modal-info">
          <div class="modal-heading-container">
            <h2 class="modal-title">${movie.Title}</h2>
            <i class="fa-solid fa-star star-icon"></i>
            <span>${movie.imdbRating}</span>
          </div>
          <div class="movie-tags">
            <span class="tag">${setFirstCharUpperCase(movie.Type)}</span>
            ${genres
              .map((genre) => `<span class="tag">${genre}</span>`)
              .join("")}
          </div>
          <p class="modal-plot">${movie.Plot}</p>
          <ul class="details">
            <li><strong>Awards:</strong> ${movie.Awards}</li>
            <li><strong>Director:</strong> ${movie.Director}</li>
            <li><strong>Writer:</strong> ${movie.Writer}</li>
            <li><strong>Language:</strong> ${movie.Language}</li>
            <li><strong>Released:</strong> ${movie.Released}</li>
          </ul>
          <div class="modal-buttons">
            <button id="add-watchlist" class="btn btn--watchlist">
              <i class="fa-solid fa-plus"></i> Watchlist
            </button>
            <button class="btn btn--close-modal" id="close-modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;

  const modalDetails = document.querySelector(".modal-details");
  modalContainer.classList.remove("hidden");
  modalDetails.style.opacity = "0";
  modalDetails.style.transform = "scale(0)";

  setTimeout(() => {
    modalDetails.style.opacity = "1";
    modalDetails.style.transform = "scale(1)";
    modalDetails.style.transition = "all .5s ease-in-out";
  }, 30);

  document.getElementById("close-modal").addEventListener("click", () => {
    document.body.classList.remove("no-scroll");
    modalContainer.classList.add("hidden");
  });

  document.getElementById("add-watchlist").addEventListener("click", () => {
    addToWatchlist(movie.imdbID);
  });
}

/* ==========================
   Watchlist Management
========================== */
function getWatchlist() {
  const stored = localStorage.getItem("movieIds");
  return stored ? JSON.parse(stored) : [];
}

function saveWatchlist(ids) {
  localStorage.setItem("movieIds", JSON.stringify(ids));
}

function addToWatchlist(imdbID) {
  const watchlist = getWatchlist();
  if (!watchlist.includes(imdbID)) {
    watchlist.push(imdbID);
    saveWatchlist(watchlist);
    showMessage("Movie added to watchlist!", "success");
  } else {
    showMessage("Movie is already in your watchlist!", "info");
  }
}

function removeFromWatchlist(imdbID) {
  const watchlist = getWatchlist().filter((id) => id !== imdbID);
  saveWatchlist(watchlist);
  showMessage("Movie removed from watchlist!", "success");
}

async function loadWatchlist() {
  const movieIds = getWatchlist();
  const container = document.getElementById("watchlist-container");
  container.innerHTML = "";

  if (movieIds.length === 0) {
    container.innerHTML = `
      <div class="explore-container">
        <h2 class="explore-title">Your watchlist is looking a little empty...</h2>
        <div class="add-movie-container">
          <i class="fa-solid fa-plus add-icon"></i>
          <a href="index.html" class="add-movie">Let’s add some movies!</a>
        </div>
      </div>`;
    return;
  }

  for (const id of movieIds) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=225a5039&i=${id}`);
    const movie = await res.json();
    container.innerHTML += renderMovieCard(movie);
  }

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const imdbID = button.dataset.id;
      removeFromWatchlist(imdbID);
      loadWatchlist();
    });
  });
}

function renderMovieCard(movie) {
  return `
  <div class="movie">
    <img class="movie-img" src="${movie.Poster}" alt="${movie.Title} Poster" />
    <div class="movie-information">
      <div class="movie-tags">
        <span class="tag">${setFirstCharUpperCase(movie.Type)}</span>
        <span class="tag">${movie.Year}</span>
      </div>
      <h3 class="movie-title">${movie.Title}</h3>
      <button class="btn btn--read-more remove-btn" data-id="${
        movie.imdbID
      }">Remove</button>
    </div>
  </div>`;
}

/* ==========================
   Utility Functions
========================== */
function setFirstCharUpperCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function formatGenres(genre) {
  return genre.split(",").map((genre) => genre.trim());
}

function showMessage(message, type) {
  const messageContainer = document.createElement("div");
  messageContainer.className = `message message--${type}`;
  messageContainer.textContent = message;

  const progressBar = document.createElement("div");
  progressBar.className = "message__progress-bar";
  messageContainer.appendChild(progressBar);

  document.body.appendChild(messageContainer);

  setTimeout(() => {
    progressBar.style.width = "0%";
    progressBar.style.transition = "width 3s linear";
  }, 10);

  setTimeout(() => {
    messageContainer.remove();
  }, 3000);
}
