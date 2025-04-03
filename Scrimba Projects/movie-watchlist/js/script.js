"use strict";

const MY_API_KEY = "225a5039";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");

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

      console.log(movieData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  } else {
    alert("Please enter a movie title.");
    return;
  }
});
