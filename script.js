const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const API_KEY = "360d002860bb96bfc31197df78a1a0d7";
//get weather data from API
const getWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  
  return data;
};
 
//searhc for data//

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return;
  weatherResult.innerHTML = 'Loading...';

  try {
  
    const data = await getWeather(city);
  const condition = data.weather[0].description;
    weatherResult.innerHTML = `
<div class="weather-info">
<h2>${data.name}</h2>
<p><strong>Condition:</strong> ${condition}</p>
<p><strong>Temperature:</strong> ${data.main.temp}°c </p>
<p><span>Feels Like:</span> ${data.main.feels_like}°c </p>
<p><span>Humidity:</span> ${data.main.humidity}% </p>
<p><span>Wind:</span> ${data.wind.speed} m/s </p>
</div>
`;


  } catch(error) {
    weatherResult.innerHTML = `Error: ${error.message}`;
}

});


//function to display weather background image//
function setBackground(condition) {
  const changeBg = document.querySelector('.weatherApp');
  if (condition.includes("cloud")) {
    changeBg.style.backgroundImage = 'url("cloud.jpeg")';
  } else if (condition.includes("rain")) {
    changeBg.style.backgroundImage = 'url("rain.jpeg")';
  } else if (condition.includes("clear")) {
    changeBg.style.backgroundImage = 'url("clear.jpeg")';
  } else if (condition.includes("snow")) {
    changeBg.style.backgroundImage = 'url("snow.jpeg")';
  } else {
    changeBg.style.backgroundImage = 'url("default.jpeg")';
  }
}

//change background//
const toggle = document.querySelector('.toggle');
toggle.addEventListener('click', () => {
  document.querySelector('.weatherApp').classList.toggle('dark');
  const sunIcon = document.querySelector('.sun');
  sunIcon.classList.toggle('fa-moon');

});
