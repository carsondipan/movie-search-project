// http://www.omdbapi.com/?i=tt3896198&apikey=f026d548

var searchBtnEl = document.querySelector("#searchBtn");
var movieInputEl = document.querySelector("#movie-input");


var fetchResults = function(movieInputEl) {
    var apiUrl = "http://www.omdbapi.com/?s=" + movieInputEl + "&apikey=f026d548";
    
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
        notify.classList.add("hidden")
        var search = movieInputEl.value.trim();
        fetchResults(search);
        console.log(search); 
    };

searchBtnEl.addEventListener("click", handleSearch);