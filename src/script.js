let isCelsius = true;

function convertTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  if (this.id === "current-fahrenheit" && isCelsius) {
    let convertedTemp = (currentTemp.innerHTML * 9) / 5 + 32;
    currentTemp.innerHTML = Math.round(convertedTemp);
    isCelsius = false;
    celsiusTemp.classList.remove("active");
    fahrenheitTemp.classList.add("active");
  } else if (this.id === "current-celsius" && !isCelsius) {
    let convertedTemp = ((currentTemp.innerHTML - 32) * 5) / 9;
    currentTemp.innerHTML = Math.round(convertedTemp);
    isCelsius = true;
    fahrenheitTemp.classList.remove("active");
    celsiusTemp.classList.add("active");
  }
}

let fahrenheitTemp = document.querySelector("#current-fahrenheit");
fahrenheitTemp.addEventListener("click", convertTemperature);

let celsiusTemp = document.querySelector("#current-celsius");
celsiusTemp.addEventListener("click", convertTemperature);

function showLocalTemperature(response) {
  search(response.data.name);
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2 forecastDay">
          <h3>${day}</h3>
          <img src="https://openweathermap.org/img/wn/02n@2x.png" alt="" id="current-weather-icon" />
          <br />
          2ºC
        </div>`;
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
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
  let iconElement = document.querySelector("#current-weather-icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}
search("Toronto");

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
