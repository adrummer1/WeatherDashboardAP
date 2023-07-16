var APIKey;
var apiBase = "api.openweathermap.org/data/2.5/";
var units = "imperial";
var city;
var currentDate = dayjs().format("dddd MMM, YYYY")

var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(currentWeather);
$("#current").text = currentWeather;
