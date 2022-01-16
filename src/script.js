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

function updateBackgroundColor() {
  let date = new Date();
  let hour = date.getHours();
  if (hour < 6 || hour >= 18) {
    document.body.classList.add("backgroundNight");
  } else {
    document.body.classList.add("backgroundDay");
  }
}

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
  currentDate = `${day} ${month} ${date}, ${hour}:${minutes}`;
  return currentDate;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2 forecastDay">
          <h3>${formatForecastDay(forecastDay.dt)}</h3>
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" id="current-weather-icon" />
          <br />
          <span id="weather-forecast-max-temp">${Math.round(
            forecastDay.temp.max
          )} </span> 
          <span id="weather-forecast-min-temp">${Math.round(
            forecastDay.temp.min
          )}</span>  
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML + `</div>`;
}

function getForecast(coordinates) {
  let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4cc4268b4dd30e55d28b095b019ccc32";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios
    .get(apiUrl)
    .then(displayWeather)
    .catch(function (error) {
      if (error.response.status === 404) {
        alert(`Didn't find weather data for ${city}`);
      } else {
        alert("Unknown error");
      }
    });
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Toronto");

updateBackgroundColor();
