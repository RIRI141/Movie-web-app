const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmY2MDkzYjgyYzVmODQ5MDY5NzgyNDRkOGFlYjNkMCIsIm5iZiI6MTczMzE1ODkwOS43NTEwMDAyLCJzdWIiOiI2NzRkZTdmZDdjMWQ2OThiN2RmODA0Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NipOyBwjc6kucT7YFbOB3NfKJCAZnIHpeLBhcFM3lfc",
  },
};

function fetchTrendingMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    // .then((res) => console.log(res.results))
    .then((res) => displayMovies(res.results))
    .catch((err) => console.error(err));
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";
    movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;

    movieCard.addEventListener("click", () => openModal(movie));

    function openModal(movie) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
        <div class="modal-container">
         <div class=modal-img>
           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
         </div>
         <div class="modal-text">
           <h2>${movie.title}</h2>
           <p>${movie.overview}</p>
         </div>
        </div>
        `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }
    moviesContainer.appendChild(movieCard);
  });
}
document.getElementById("search-bar").addEventListener("input", (e) => {
  const searchQuery = e.target.value.trim();
  if (searchQuery === "") {
    fetchTrendingMovies();
  } else {
    fetchSearchedMovies(searchQuery);
  }
});

function fetchSearchedMovies(query) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  fetch(searchUrl, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.results.length > 0) {
        displayMovies(res.results);
      } else {
        displayNoResults();
      }
    })
    .catch((err) => console.error(err));
}

function displayNoResults() {
  const moviesContainer = document.getElementById("movies");
  moviesContainer.innerHTML = "<p>No movies found. Try another search.</p>";
}

window.addEventListener("load", fetchTrendingMovies);
