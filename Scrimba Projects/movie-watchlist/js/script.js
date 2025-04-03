"use strict";

const MY_API_KEY = "225a5039";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const movieListEl = document.getElementById("movie-list");
const modalContainer = document.getElementById("modal-container");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close-modal");

btnSearch.addEventListener("click", async () => {
  if (inputSearch.value !== "") {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${MY_API_KEY}&s=${inputSearch.value}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }

      const movieData = await response.json();

      renderMovies(movieData.Search);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  } else {
    alert("Please enter a movie title.");
    return;
  }
});

function renderMovies(movieList) {
  let moviesHTML = "";

  movieList.forEach((movie) => {
    moviesHTML += `
      <div class="movie">
        <div class="movie__img">
          <img src="${movie.Poster}" alt=""/>
        </div>
        <div class="movie__info">
          <div class="movie__heading">
            <h3 class="movie__title">${movie.Title}</h3>
          </div>
        </div>
        <button class="read-more" data-id="${movie.imdbID}">Read more</button>
      </div>`;
  });

  movieListEl.innerHTML = moviesHTML;

  const readMoreEls = document.querySelectorAll(".read-more");

  readMoreEls.forEach((button) => {
    button.addEventListener("click", async () => {
      const movieId = button.getAttribute("data-id");

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${MY_API_KEY}&i=${movieId}`
      );

      const data = await response.json();

      console.log(data);
      renderMovieInfo(data);
    });
  });
}

function renderMovieInfo(movie) {
  modalContainer.classList.remove("hidden");
  closeModal.classList.remove("hidden");
  modal.innerHTML = `<div class="movie">
            <div class="movie__img">
              <img src="${movie.Poster}" alt="An image of the movie ${movie.Title}" />
            </div>
            <div class="movie__info">
              <div class="movie__heading">
                <h3 class="movie__title" id="movie__title">${movie.Title}</h3>
                <span><i class="fa-solid fa-star icon-star"></i></span>
                <span class="movie__rate" id="movie__rate">${movie.imdbRating}</span>
              </div>
              <div class="movie__details">
                <div class="movie__detail">
                  <span class="movie__duration">${movie.Runtime}</span>
                  <span class="movie__genre">${movie.Genre}</span>
                </div>
                <div class="movie__detail">
                  <span class="movie__duration">Director: ${movie.Director}</span>
                  <span class="movie__genre">Released: ${movie.Released}</span>
                </div>
                <div class="movie__detail">
                  <span class="movie__duration">Type: ${movie.Type}</span>
                </div>
                <button class="btn movie__watchlist-btn">
                  <i class="fa-solid fa-plus"></i> Watchlist
                </button>
              </div>
              <p class="movie__description">
                ${movie.Plot}
              </p>
            </div>
          </div>`;

  document.body.style.overflow = "hidden";
}

closeModal.addEventListener("click", function () {
  modalContainer.classList.add("hidden");
  document.body.style.overflow = "";
});
