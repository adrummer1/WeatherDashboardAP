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

// Event function for submitting the "city" form
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

// API call to get the current weather data
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

// Function to display the current weather for the city searched
var displayCity = function (city) {
    if (city.length === 0) {
        weatherNowEl.textContent = "City not found.";
    return;
    } else {
        var cityName = document.getElementById("city-name");
            cityName.textContent = city.name;
        var weatherDate = document.createElement("div");
            weatherDate.textContent = currentDate;
        var temp = document.getElementById("current-temp");
            temp.textContent = "Temperature: " + city.main.temp;
        var humidity = document.getElementById("current-humid");
            humidity.textContent = "Humidity: " + city.main.humidity;
            console.log(humidity);
        var wind = document.getElementById("current-wind");
            wind.textContent = "Wind Speed: " + city.wind.speed;
            console.log(wind);
        var iconCode = city.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        $("#weather-icon").attr("src", iconUrl);
    }
};

// Function and loop to create the five day forecast with forecast cards
var displayForecast = function (city) {
    for (var j = 0; j < 5; j++) {

        var forecastContainer = document.querySelector('.forecast' + [j]);
        // console.log(forecastContainer.children)
        // console.log(forecastContainer.children[0].id)
        var weatherDate = document.getElementById(forecastContainer.children[0].id)
        var icon = document.getElementById(forecastContainer.children[1].id)
        var temp = document.getElementById(forecastContainer.children[2].id)
        console.log(forecastContainer.children[2])
        var humid = document.getElementById(forecastContainer.children[3].id)
        // console.log(humid)
        var wind = document.getElementById(forecastContainer.children[4].id)
        // console.log(wind)
        // var forecastCard = document.createElement('div');
        // forecastCard.className = "forecast-card col-12 col-md-4";
        iconCode = city.list[((j + 1) * 8) - 1].weather[0].icon;
        iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
        icon.setAttribute("src", iconUrl);
        weatherDate.textContent = city.list[((j + 1) * 8) - 1].dt_txt.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$2-$3-$1');
        temp.textContent = 'Temperature: ' + city.list[((j + 1) * 8) - 1].main.temp;
        humid.textContent = 'Humidity: ' + city.list[((j + 1) * 8) - 1].main.humidity;
     	wind.textContent = 'Wind Speed: ' + city.list[((j + 1) * 8) - 1].wind.speed;
    }
}; 

// Function to render the searched cities from localStorage to the page
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

// Event listener for when a user clicks the form submit button
document.getElementById("form").addEventListener("submit", formSubmitHandler) 


// Function for when the user clicks on a city from their history it displays the weather from that city
$(document).on("click", ".cities", function () {
    city = $(this).text();
    $(city).on("click", getUserCity)
    getUserCity(city);
});



localStorage.clear();
