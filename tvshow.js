const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmY2MDkzYjgyYzVmODQ5MDY5NzgyNDRkOGFlYjNkMCIsIm5iZiI6MTczMzE1ODkwOS43NTEwMDAyLCJzdWIiOiI2NzRkZTdmZDdjMWQ2OThiN2RmODA0Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NipOyBwjc6kucT7YFbOB3NfKJCAZnIHpeLBhcFM3lfc",
  },
};

function fetchTrendingTVShows() {
  fetch("https://api.themoviedb.org/3/trending/tv/day?language=en-US", options)
    .then((res) => res.json())
    .then((res) => displayTVShows(res.results))
    .catch((err) => console.error(err));
}

function displayTVShows(tvShows) {
  const tvShowsContainer = document.getElementById("tv-shows");
  tvShowsContainer.innerHTML = "";
  tvShows.forEach((show) => {
    const tvShowCard = document.createElement("div");
    tvShowCard.className = "tv-show-card";

    tvShowCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
        <h3>${show.name}</h3> 
      `;

    tvShowCard.addEventListener("click", () => openModal(show));

    function openModal(show) {
      const overlay = document.createElement("div");
      overlay.className = "overlay";

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
      <div class="modal-container">
       <div class="modal-img">
         <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
       </div>
       <div class="modal-text">
         <h2>${show.name}</h2>
         <p>${show.overview}</p>
         <p>First Air Date: ${show.first_air_date}</p> 
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
    tvShowsContainer.appendChild(tvShowCard);
  });
}

document.getElementById("search-bar").addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const tvs = document.querySelectorAll(".tv-show-card");

  tvs.forEach((tv) => {
    const title = tv.querySelector("h3").textContent.toLowerCase();
    tv.style.display = title.includes(searchQuery) ? "" : "none";
  });
});

document.getElementById("search-bar").addEventListener("input", (e) => {
  const searchQuery = e.target.value.trim();
  if (searchQuery === "") {
    fetchTrendingTVShows();
  } else {
    fetchSearchedTvs(searchQuery);
  }
});

function fetchSearchedTvs(query) {
  const searchUrl = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  fetch(searchUrl, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.results.length > 0) {
        displayTVShows(res.results);
      } else {
        displayNoResults();
      }
    })
    .catch((err) => console.error(err));
}

function displayNoResults() {
  const tvShowsContainer = document.getElementById("tv-shows");
  tvShowsContainer.innerHTML = "<p>No TV shows found. Try another search.</p>";
}
window.addEventListener("load", fetchTrendingTVShows);
