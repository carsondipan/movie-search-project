// global variables
var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");
var movieDetailsEl = document.querySelector("#movie-details");
var imdbBtnEl = document.querySelector("#IMDB-btn");
var youtubeVideoEl = document.querySelector("#youtube-video");
var prevResults = document.querySelector("#prev-results");
var clearLocalBtn = document.querySelector(".clear-local");
var notify = document.querySelector("#notify");
var apiKey = "f026d548";
var imdbApiKey = "k_9ultv29h";

// function to create movie details section
var displayMovieDetails = function (search) {
    movieDetailsEl.innerHTML = null;
    movieDetailsEl.className = "card";
    var movieTitle = document.createElement("h2");
    movieTitle.className = "movie-title text-center my-4";
    movieTitle.textContent = "Movie Title: " + search.Search[0].Title;
    var moviePoster = document.createElement("img");
    moviePoster.className = "movie-poster mb-4 mx-auto d-block";
    moviePoster.src = search.Search[0].Poster;
    var mediaType = document.createElement("h2");
    mediaType.className = "media-type text-center mb-4";
    mediaType.textContent = "Media Type: " + search.Search[0].Type.toUpperCase();
    var releaseDate = document.createElement("h2");
    releaseDate.className = "release-date text-center mb-4";
    releaseDate.textContent = "Release Date: " + search.Search[0].Year;
    movieDetailsEl.append(movieTitle, moviePoster, mediaType, releaseDate);
};

// function to display embedded youtube video
var displayYoutubeUrl = function (data) {
    youtubeVideoEl.innerHTML = null;
    var videoId = data.videoId;
    var videoURL = `https://www.youtube.com/embed/${videoId}`
    var iframeEl = document.createElement("iframe");
    iframeEl.setAttribute("src", videoURL);
    iframeEl.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
    iframeEl.setAttribute("allowfullscreen", 1);
    iframeEl.className = "embed-responsive-item";
    youtubeVideoEl.appendChild(iframeEl);
};

// fetch results to get youtube imdbID to find youtube trailer associated with search
var fetchimdbID = function(search) {
    var imdbID = search.Search[0].imdbID;
    var imdbYoutubeUrl = `https://imdb-api.com/API/YouTubeTrailer/${imdbApiKey}/${imdbID}`;
    fetch(imdbYoutubeUrl)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            displayYoutubeUrl(data);
        })
        .catch(function(err){
            console.log(err);
        });
};

// fetch results for search input to get movie/show details
var fetchResults = function(movieInputEl) {
    var apiUrl = `https://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`;
    
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayMovieDetails(data);
        fetchimdbID(data);
    })
    .catch(function (error) {
        console.log(error);
    });
};

// check local storage for search or empty string
var previousSearch = JSON.parse(localStorage.getItem("previousSearch") || "[]");
var savePreviousSearch = function(search) {
    var search = movieInputEl.value.trim();
    // if in local storage will stop function and move on 
    if (previousSearch.includes(search)){
        return;
    } else {
        // if search input is not in local storage will push input to local storage
        previousSearch.push(search);
            localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
            displayPreviousSearch();
        }
    };
    
    // function to create previous search button in footer
    var displayPreviousSearch = function () {
        prevResults.innerHTML = "";
        for (i = 0; i < previousSearch.length; i++) {
            var previousSearchBtn = document.createElement("button");
            previousSearchBtn.className = "btn-lg btn-outline-success mx-2";
            previousSearchBtn.setAttribute("id", "searchBtn");
            previousSearchBtn.textContent = previousSearch[i];
        if (prevResults.innerHTML === null) {
            return;
        }
        prevResults.appendChild(previousSearchBtn);
        // repopulate main content area with previous search results
        previousSearchBtn.addEventListener("click", (event) => {
            var repopBtn = event.target.innerHTML;
            fetchResults (repopBtn);
        })
    }
};

// function for handling search results
var handleSearch = function() {
    notify.classList.add("hidden")
    var search = movieInputEl.value.trim();
    // if empty string display modal alert to enter search title
    if (search === "") {
        notify.classList.remove("hidden")
    } else {
    fetchResults(search);
    savePreviousSearch(search);
    }
};

// event listener for search button pressed
searchBtnEl.addEventListener("click", handleSearch, function(event) {
    event.preventDefault();
});

// event listener for clear search button press which will clear local storage 
clearLocalBtn.addEventListener("click", function() {
    localStorage.clear();
  });

displayPreviousSearch ();

