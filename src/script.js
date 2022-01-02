function showCityTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#current-temp");
  cityTemp.innerHTML = temperature;
}

/*function updateCityName(event) {
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
city.addEventListener("submit", updateCityName);*/

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

/*function showLocalTemperature(response) {
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
button.addEventListener("click", onCurrentLocationClicked);*/

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate();
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${month} ${date}, ${hour}:${minutes}`;
}
function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let maxTempElement = document.querySelector("#max-temp");
  let minTempElement = document.querySelector("#min-temp");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#current-date");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
let units = "metric";
let city = "Toronto";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
