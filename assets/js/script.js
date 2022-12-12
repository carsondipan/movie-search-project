// http://www.omdbapi.com/?i=tt3896198&apikey=f026d548

var apiUrl = "http://www.omdbapi.com/?s=elf&apikey=f026d548";

fetch(apiUrl)
.then(res => res.json())
.then(data => console.log(data))