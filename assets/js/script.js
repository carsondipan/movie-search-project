
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

var youtubeDisplay = function (search) {
    youtubeVideoEl.innerHTML = null;
    var youtubeTrailerTitle = document.createElement("h3");
    youtubeTrailerTitle.className = "movie-title text-center my-4"
    youtubeTrailerTitle.textContent = search.Search[0].Title + " " + search.Search[0].Year;
    var youtubeVideo = document.createElement("iframe");
    youtubeVideo.className = `border solid 4px border-light” width=“560" height=“315” src=“${youtubeUrl}” frameborder=“0” allow=“accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture” allowfullscreen`;
    youtubeVideoEl.appendChild(youtubeTrailerTitle);
    youtubeTrailerTitle.append(youtubeVideo);
};

var fetchTrailer = function(search) {
    var searchQuery = search.Search[0].Title + " " + search.Search[0].Year;
    console.log(searchQuery)
    var youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}${"trailer"}&key=${youtubeApiKey2}`;
    fetch(youtubeUrl)
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
        fetchTrailer(data);
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });
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

var previousSearch = JSON.parse(localStorage.getItem("previousSearch") || "[]")
    var savePreviousSearch = function(search){
        var search = movieInputEl.value.trim()
        if (previousSearch.includes(search)){
            return;
        } else {
            previousSearch.push(search);
            localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
            displayPreviousSearch();
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