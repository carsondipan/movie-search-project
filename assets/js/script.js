
var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");
var movieDetailsEl = document.querySelector("#movie-details");
var imdbBtnEl = document.querySelector("#IMDB-btn");
var youtubeVideoEl = document.querySelector("#youtube-video");
var apiKey = "f026d548";

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

var fetchTrailer = function(search) {
    var searchQuery = search.Search[0].Title + " " + search.Search[0].year;
    var youtubeUrl = "";
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
}

var fetchResults = function(movieInputEl) {
    var apiUrl = `http://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`;
    
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayMovieDetails(data);
        // fetchTrailer(data);
        imdbBtnEl.classList.remove("hidden");
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

// var youtubeApiKey = "AIzaSyCn90WcyhMlfORhRQMjSWg1jSozf4ZlfF4";
// var youtubeApiKey2 = "AIzaSyDWmXhjEBiBf76Wf4dj-E5_sc6KjDhagYU";
// var youtubeSearchCri = movieInputEl + releaseDate;

// var youtubeApiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${youtubeSearchCri}&key=${youtubeApiKey}`

// 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY]'

var youtubeApiUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=StarWarsEpisodeIV-ANewHope-movie-review&key=AIzaSyCn90WcyhMlfORhRQMjSWg1jSozf4ZlfF4';

fetch(youtubeApiUrl)
.then(res => res.json())
.then(data => console.log(data));

var getVideos = function () {
    var youtubeUrl = `http://www.omdbapi.com/?s=${movieInputEl}&apikey=${apiKey}`
}
// var displayYoutubeVideo = function (items) {
    //     youtubeVideoEl.innerHTML = null;
    //     var youtubePlayer = document.createElement("iframe");
    //     youtubePlayer.className = "width='560', height='315' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen"
    //     youtubePlayer.textContent = 
    
    
    //   };
    
    //   var fetchYoutubeResults = function(movieInputEl) {
        //     var youtubeApiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${movieInputEl}&key=${youtubeApiKey}`
        
        //     fetch(youtubeApiUrl)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             displayYoutubeVideo(data);
    //             console.log(data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     };
        
    //     var handleYoutubeSearch = function() {
    //         var search = movieInputEl.value.trim();
    //         fetchYoutubeResults(search);
    //         console.log(search); 
    //     };

searchBtnEl.addEventListener("click", handleSearch, function(event) {
    event.preventDefault();
});
