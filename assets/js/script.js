
var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");
var movieDetailsEl = document.querySelector("#movie-details");
var imdbBtnEl = document.querySelector("#IMDB-btn");
var youtubeVideoEl = document.querySelector("#youtube-video");
var apiKey = "f026d548";
var youtubeApiKey = "AIzaSyCn90WcyhMlfORhRQMjSWg1jSozf4ZlfF4";
var youtubeApiKey2 = "AIzaSyAT9a8lxxa7X2nHaEXa7LhPl2IDCLTekyM";
var prevResults = document.querySelector("#prev-results");
// var youtubeApiKey2 = "AIzaSyDWmXhjEBiBf76Wf4dj-E5_sc6KjDhagYU";
var imdbApiKey = "k_9ultv29h";

var displayMovieDetails = function (search) {
    movieDetailsEl.innerHTML = null;
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

var displayYoutubeUrl = function (data) {
    movieDetailsEl.innerHTML = null;
    var imdbID = data.videoUrl;
    console.log(imdbID);
    var youtubeLink = document.createElement("a");
    youtubeLink.setAttribute('href', imdbID)
    // youtubeLink.textContent

}

var fetchimdbID = function(search) {
    var imdbID = search.Search[0].imdbID;
    // console.log(imdbID);
    var imdbYoutubeUrl = `https://imdb-api.com/API/YouTubeTrailer/${imdbApiKey}/${imdbID}`;
    fetch(imdbYoutubeUrl)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
        })
        .catch(function(err){
            console.log(err);
        });
};

var fetchResults = function(movieInputEl) {
    var apiUrl = `http://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`;
    
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayMovieDetails(data);
        fetchimdbID(data);
        displayYoutubeUrl(data);
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });
};

var previousSearch = JSON.parse(localStorage.getItem("previousSearch") || "[]");
var savePreviousSearch = function(search) {
    var search = movieInputEl.value.trim();
    console.log(search);
    if (previousSearch.includes(search)){
        return;
    } else {
        previousSearch.push(search);
            localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
            displayPreviousSearch();
        }
    };
    
    var displayPreviousSearch = function () {
        prevResults.innerHTML = "";
        for (i = 0; i < previousSearch.length; i++) {
            var previousSearchBtn = document.createElement("button");
            previousSearchBtn.className = "btn-lg btn-outline-success";
            previousSearchBtn.textContent = previousSearch[i];
        if (prevResults.innerHTML === null) {
            return;
        }
        prevResults.appendChild(previousSearchBtn);
        previousSearchBtn.addEventListener("click", (event) => {
            var repopBtn = event.target.innerHTML;
            fetchResults (repopBtn);
        })
    }
};

var handleSearch = function() {
    var search = movieInputEl.value.trim();
    fetchResults(search);
    console.log(search);
};

searchBtnEl.addEventListener("click", handleSearch, function(event) {
    event.preventDefault();
});

displayPreviousSearch ();
