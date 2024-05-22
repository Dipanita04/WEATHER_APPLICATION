var cityName = document.getElementById("cityInput");
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const submit = document.getElementById("apiSearch");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const cityOutput = document.getElementById("cityOutput");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    " " +
    `<span id="am-pm">${ampm}</span>`;
  dateEl.innerHTML = days[day] + "," + date + " " + months[month];
}, 1000);

function GetInfo(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=7&appid=04f1f391a50e02464aae1a4b29604234`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const currentData = data.list[0];

      const humidity = currentData.main.humidity;
      const pressure = currentData.main.pressure;
      const wind_speed = currentData.wind.speed;
      const currtempetaure = currentData.main.temp.toFixed(1);
      const weatherIconn = currentData.weather[0].icon;

      document.getElementById("hum").innerHTML = `Humidity  :  ${humidity}%`;
      document.getElementById(
        "pressure"
      ).innerHTML = `Pressure  :  ${pressure} hPa`;
      document.getElementById(
        "windSpeed"
      ).innerHTML = `Wind Speed  :  ${wind_speed} m/s`;

      document.getElementById(
        "temperatureDisplay"
      ).innerHTML = ` ${currtempetaure}°C`;

      document.getElementById(
        "weatherIcon"
      ).src = `https://openweathermap.org/img/wn/${weatherIconn}.png`;

      document.getElementById(
        "cityOutput"
      ).textContent = `WEATHER FOR ${cityName.toUpperCase()}`;

      const weatherData = data.list.slice(0, 7);

      weatherData.forEach((dayData, index) => {
        const dayIndex = (new Date().getDay() + index) % 7;
        const minTemp = dayData.main.temp_min.toFixed(1);
        const maxTemp = dayData.main.temp_max.toFixed(1);
        const iconCode = dayData.weather[0].icon;

        document.getElementById(
          `day${dayIndex + 1}Min`
        ).innerHTML = `Min: ${minTemp} °C`;
        document.getElementById(
          `day${dayIndex + 1}Max`
        ).innerHTML = `Max: ${maxTemp} °C`;
        document.getElementById(
          `img${dayIndex + 1}`
        ).src = `https://openweathermap.org/img/wn/${iconCode}.png`;
      });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

submit.addEventListener("click", () => {
  GetInfo(cityName.value);
  cityName.value = " ";
});
