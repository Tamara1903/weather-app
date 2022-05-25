const axios = require("axios").default;

let now = new Date();
let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h2.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayWeatherCodition(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}°C`;
}

function searchCity(city) {
  let key = `3e0204991758bc4274631d63468afcf2`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeatherCodition);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function showCurrentPosition(position) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Your location is ${position.coords.latitude}, ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let buttonLocation = document.querySelector("#button-location");
buttonLocation.addEventListener("click", getCurrentPosition);

searchCity("Belgrade");
