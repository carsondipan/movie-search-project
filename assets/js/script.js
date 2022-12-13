// http://www.omdbapi.com/?i=tt3896198&apikey=f026d548

var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");
var movieDetailsEl = document.querySelector("#movie-details");

var apiKey = "f026d548";


var displayMovieDetails = function (Search) {
    movieDetailsEl.innerHTML = null;
    var movieTitle = document.createElement("h2");
    movieTitle.className = "movie-title";
    movieTitle.textContent = "Movie Title: " + Search.Search[0].Title;
    var moviePoster = document.createElement("img");
    moviePoster.className = "movie-poster";
    moviePoster.src = Search.Search[0].Poster;
    var mediaType = document.createElement("h2");
    mediaType.className = "media-type";
    mediaType.textContent = "Media Type: " + Search.Search[0].Type.toUpperCase();
    var releaseDate = document.createElement("h2");
    releaseDate.className = "release-date";
    releaseDate.textContent = "Release Date: " + Search.Search[0].Year;
    movieDetailsEl.appendChild(movieTitle);
    movieTitle.append(moviePoster, mediaType, releaseDate);
}







var fetchResults = function(movieInputEl) {
    var apiUrl = `http://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`;
    
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayMovieDetails(data) 
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    
    var handleSearch = function() {
        var search = movieInputEl.value.trim();
        fetchResults(search);
        console.log(search); 
    };

searchBtnEl.addEventListener("click", handleSearch, function(event) {
    event.preventDefault();
});

var fetchVideos = function () {
    var apiUrl = ""
}

var displayResults = function() {

}