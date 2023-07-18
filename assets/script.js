var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#city");
var weatherNowEl = document.querySelector(".current");
var citySearchTerm = document.querySelector("#weather-search")
var history = document.querySelector("#search-history");
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

var displayCity = function (city) {
    if (city.length === 0) {
        weatherNowEl.textContent = "City not found.";
    return;
    }

    var currentWeatherHTML = document.getElementsByClassName("cityInfo")[0];
    var cityName = document.createElement("div");
        cityName.textContent = city.name;
        cityName.style.cssText = "color:green;font-size:2rem";
    var weatherDate = document.createElement("div");
        weatherDate.textContent = currentDate;
    var temp = document.createElement("div");
        temp.textContent = "Temperature: " + city.main.temp;
    var humidity = document.createElement("div");
        humidity.textContent = "Humidity: " + city.main.humidity;
    var wind = document.createElement("div");
        wind.textContent = "Wind Speed: " + city.wind.speed;
    currentWeatherHTML.append(cityName);
    currentWeatherHTML.append(weatherDate);
    currentWeatherHTML.append(temp);
    currentWeatherHTML.append(humidity);
    currentWeatherHTML.append(wind);

    var iconcode = city.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
    $("#weather-icon").attr("src", iconurl);
};

for (var i = 0; i < city.length; i++) {
    var cityName = city[i].city.name;
}

function renderCities() {
    var storedCity = localStorage.getItem("citySearch")
    if (!city) {
        return;
    }

    history.textContent = storedCity;
}

var citySearch = document.querySelector("#city").value;
localStorage.setItem("city", citySearch)
renderCities();
console.log(localStorage)

document.getElementById("form").addEventListener("submit", formSubmitHandler);

