// assets/js/weather-widget.js
export default function WeatherWidget() {
  const container = document.getElementById('weather-widget-container');
  if (!container) return;

  const apiKey = container.dataset.apiKey;
  const cityId = container.dataset.cityId;
  const initialUnits = container.dataset.units || 'metric'; // Pour l'appel API
  const lang = container.dataset.lang || 'en';

  const loadingDiv = container.querySelector('.weather-loading');
  const dataDiv = container.querySelector('.weather-data');
  const errorDiv = container.querySelector('.weather-error');
  const iconEl = document.getElementById('weather-widget-icon');
  const tempEl = document.getElementById('weather-widget-temp');
  const descEl = document.getElementById('weather-widget-desc');
  
  const celsiusButton = document.getElementById('weather-unit-celsius');
  const fahrenheitButton = document.getElementById('weather-unit-fahrenheit');

  let tempCelsius = null; // Pour stocker la température en Celsius
  let currentDisplayUnit = localStorage.getItem('weatherDisplayUnit') || 'metric'; // 'metric' ou 'imperial'

  if (!apiKey || !cityId) {
    console.error('Weather widget: API key or City ID is missing.');
    if (loadingDiv) loadingDiv.style.display = 'none';
    if (errorDiv) { errorDiv.textContent = 'Widget configuration error.'; errorDiv.style.display = 'block'; }
    return;
  }

  function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9/5) + 32);
  }

  function fahrenheitToCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5/9);
  }

  function updateTemperatureDisplay() {
    if (tempCelsius === null || !tempEl) return;

    if (currentDisplayUnit === 'metric') {
      tempEl.textContent = Math.round(tempCelsius);
      if (celsiusButton) { celsiusButton.classList.add('active'); celsiusButton.setAttribute('aria-pressed', 'true'); }
      if (fahrenheitButton) { fahrenheitButton.classList.remove('active'); fahrenheitButton.setAttribute('aria-pressed', 'false'); }
    } else { // imperial
      tempEl.textContent = celsiusToFahrenheit(tempCelsius);
      if (celsiusButton) { celsiusButton.classList.remove('active'); celsiusButton.setAttribute('aria-pressed', 'false'); }
      if (fahrenheitButton) { fahrenheitButton.classList.add('active'); fahrenheitButton.setAttribute('aria-pressed', 'true'); }
    }
  }

  if (celsiusButton && fahrenheitButton) {
    celsiusButton.addEventListener('click', () => {
      if (currentDisplayUnit !== 'metric') {
        currentDisplayUnit = 'metric';
        localStorage.setItem('weatherDisplayUnit', 'metric');
        updateTemperatureDisplay();
      }
    });

    fahrenheitButton.addEventListener('click', () => {
      if (currentDisplayUnit !== 'imperial') {
        currentDisplayUnit = 'imperial';
        localStorage.setItem('weatherDisplayUnit', 'imperial');
        updateTemperatureDisplay();
      }
    });
  }

  // Appel API initial toujours en métrique
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric&lang=${lang}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      if (loadingDiv) loadingDiv.style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
      if (dataDiv) dataDiv.style.display = 'block';

      if (data.weather && data.weather.length > 0) {
        if (descEl) descEl.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        if (iconEl) {
          iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          iconEl.alt = data.weather[0].description;
        }
      }
      if (data.main) {
        tempCelsius = data.main.temp; // Stocker la température Celsius
        updateTemperatureDisplay(); // Afficher selon la préférence actuelle
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      if (loadingDiv) loadingDiv.style.display = 'none';
      if (dataDiv) dataDiv.style.display = 'none';
      if (errorDiv) { errorDiv.textContent = 'Could not load weather.'; errorDiv.style.display = 'block';}
    });
}