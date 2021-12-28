let currentDate = new Date();
let date = currentDate.getDate();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octotber",
  "November",
  "December",
];
let month = months[currentDate.getMonth()];

currentDate = `${day} ${month} ${date}, ${hour}:${minutes}`;

let showCurrentDate = document.querySelector("#current-date");
showCurrentDate.innerHTML = currentDate;

function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = temperature;
}

function updateCityName(event) {
  event.preventDefault();
  let showCity = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${showCity.value}`;
  let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
  let units = "metric";
  let city = showCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCityTemperature);
}

let city = document.querySelector("#city-search");
city.addEventListener("submit", updateCityName);

let isCelsius = true;

function convertTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  if (this.id === "current-fahrenheit" && isCelsius) {
    let convertedTemp = (currentTemp.innerHTML * 9) / 5 + 32;
    currentTemp.innerHTML = Math.round(convertedTemp);
    isCelsius = false;
  } else if (this.id === "current-celsius" && !isCelsius) {
    let convertedTemp = ((currentTemp.innerHTML - 32) * 5) / 9;
    currentTemp.innerHTML = Math.round(convertedTemp);
    isCelsius = true;
  }
}

let fahrenheitTemp = document.querySelector("#current-fahrenheit");
fahrenheitTemp.addEventListener("click", convertTemperature);

let celsiusTemp = document.querySelector("#current-celsius");
celsiusTemp.addEventListener("click", convertTemperature);

function showLocalTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let localCity = document.querySelector("#current-city");
  let currentTemp = document.querySelector("#current-temp");
  localCity.innerHTML = city;
  currentTemp.innerHTML = temperature;
}

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocalTemperature);
}

function onCurrentLocationClicked(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", onCurrentLocationClicked);
