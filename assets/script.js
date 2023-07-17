var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#city");
var weatherNowEl = document.querySelector("#weatherNow");
var citySearchEl = document.querySelector("#weather-search")
var APIKey = "c1e47e9d5eb11ce67e07485421770f51";
var apiBase = "api.openweathermap.org/data/2.5/";
var units = "imperial";
var currentDate = dayjs().format("dddd MMM, YYYY")

var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getUserCity(city);

        weatherNowEl.textContent = "";
        cityInputEl.textContent = "";
    } else {
        alert("Please enter a city name.");
    }
};

var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(currentWeather)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
            console.log(data);
            displayCity(data);        
            });
        } else {
            alert("Error: ")
        }
    })
$("#weatherNow").textContent = currentWeather;
