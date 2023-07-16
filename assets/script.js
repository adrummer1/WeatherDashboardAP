var APIKey = "c1e47e9d5eb11ce67e07485421770f51";
var apiBase = "api.openweathermap.org/data/2.5/";
var units = "imperial";
var city;
var currentDate = dayjs().format("dddd MMM, YYYY")

var currentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(currentWeather);
$("#current").text = currentWeather;
