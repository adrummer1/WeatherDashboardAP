var userFormEl = document.querySelector("#form");
var cityInputEl = document.querySelector("#city");
var weatherNowEl = document.querySelector(".current");
var forecastEl = document.querySelector(".forecast");
var citySearchTerm = document.querySelector("#weather-search");
var history = document.querySelector("#search-history");
var APIKey = "c1e47e9d5eb11ce67e07485421770f51";
var apiBase = "api.openweathermap.org/data/2.5/";
var units = "imperial";
var currentDate = dayjs().format("dddd, MMM DD, YYYY")
var searchHistory = []
var city;

var formSubmitHandler = function(event) {
    event.preventDefault();

    city = cityInputEl.value.trim();
    
    if (city) {
        getUserCity(city);
        searchHistory.push(city);
        localStorage.setItem("city", JSON.stringify(searchHistory));
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
            function forecast(city) {
                var latitude = "city.coord.lat";
                var longitude = "city.coord.lon";
                var forecastWeather = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=" + units;
            
                fetch(forecastWeather)
                    .then(function (response) {
                        if (response.ok) {
                            console.log(response);
                            response.json().then(function (data) {
                            console.log(data);
                            displayForecast(data);        
                            });
                        }; 
                    }); 
            } forecast(city);
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

var displayForecast = function (city) {
    var forecastHTML = document.getElementsByClassName("forecast1")[0];
    weatherDate = document.createElement("div");
        weatherDate.textContent = city.list[3].dt_txt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2-$3-$1');
    temp = document.createElement("div");
        temp.textContent = "Temperature: " + city.list[3].main.temp;
    humidity = document.createElement("div");
        humidity.textContent = "Humidity: " + city.list[3].main.humidity;
    wind = document.createElement("div");
     	wind.textContent = "Wind Speed: " + city.list[3].wind.speed;
    forecastHTML.append(weatherDate);
    forecastHTML.append(temp);
    forecastHTML.append(humidity);
    forecastHTML.append(wind);
};

function renderCities() {
    var storage = localStorage.getItem("city");
    if (storage) {
        searchHistory = JSON.parse(storage)
    for (var i = 0; i < searchHistory.length; i++) {
        var list = $("<p class='cities'>");
        list.attr("data", searchHistory[i]);
        list.text(searchHistory[i])
        $("#search-history").append(list);
    }
    }  
}

renderCities();

document.getElementById("form").addEventListener("submit", formSubmitHandler);


$(document).on("click", ".cities", function () {
    city = $(this).text();
    console.log($(this).text())
    $(city).on("click", getUserCity)
    getUserCity();
});

