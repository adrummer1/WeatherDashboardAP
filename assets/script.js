var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#city");
var weatherNowEl = document.querySelector(".current");
var citySearchTerm = document.querySelector("#weather-search")
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

function getUserCity(city) {
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
            alert("Error: Request not found.")
        }
    })
}

var displayCity = function (city, searchTerm) {
    if (city.length === 0) {
        weatherNowEl.textContent = "City not found.";
    } return;
}

for (var i = 0; i < city.length; i++) {
    var cityName = city[i].city.name;

    var cityEl = document.createElement('p');
    cityEl.classList = "list-item flex-row justify-space-between align-center";
    cityEl.textContent = cityName;

    // var headerEl = document.createElement("span");
    // headerEl.textContent = cityName;

    // cityEl.appendChild(headerEl);
    
    weatherNowEl.appendChild(cityEl);
}

weatherNowEl.textContent = cityName;



document.getElementById("form").addEventListener("submit", formSubmitHandler);

