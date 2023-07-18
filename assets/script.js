var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#city");
var weatherNowEl = document.querySelector(".current");
var citySearchTerm = document.querySelector("#weather-search")
var APIKey = "c1e47e9d5eb11ce67e07485421770f51";
var apiBase = "api.openweathermap.org/data/2.5/";
var units = "imperial";
var currentDate = dayjs().format("dddd, MMM DD, YYYY")

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
var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=" + units;

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
    return;
    }

    var currentWeatherHTML = document.getElementsByClassName("cityInfo")[0];
    currentWeatherHTML.append(city.name);
    var weatherDate = document.createElement("div");
    weatherDate.textContent = currentDate;
    var temp = document.createElement("div");
    temp.textContent = "Temperature: " + city.main.temp;
    var humidity = document.createElement("div");
    humidity.textContent = "Humidity: " + city.main.humidity;
    var wind = document.createElement("div");
    wind.textContent = "Wind Speed: " + city.wind.speed;
    currentWeatherHTML.append(weatherDate);
    currentWeatherHTML.append(city.weather[0].icon);
    currentWeatherHTML.append(temp);
    currentWeatherHTML.append(humidity);
    currentWeatherHTML.append(wind);
};

for (var i = 0; i < city.length; i++) {
    var cityName = city[i].city.name;

    // var cityEl = document.createElement('p');
    // cityEl.classList = "list-item flex-row justify-space-between align-center";
    // cityEl.textContent = cityName;

    // var headerEl = document.createElement("span");
    // headerEl.textContent = cityName;

    // cityEl.appendChild(headerEl);
    
    // weatherNowEl.appendChild(cityEl);
}

// weatherNowEl.textContent = cityName;



document.getElementById("form").addEventListener("submit", formSubmitHandler);

