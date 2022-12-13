// http://www.omdbapi.com/?i=tt3896198&apikey=f026d548

var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");
var movieDetailsEl = document.querySelector("#movie-details");

var apiKey = "f026d548";


var displayMovieDetails = function (search) {
    currentMovie.innerHTML = null;
    var movieTitle = document.createElement("h2");
    movieTitle.class = "movie-title";
    
}







var fetchResults = function(movieInputEl) {
    var apiUrl = `http://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`;
    
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) { 
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