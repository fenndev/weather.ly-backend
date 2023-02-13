import axios from "axios";
import WeatherData from "../classes/WeatherData.js";
import LocationResponse from "../interfaces/LocationResponse.js";
import WeatherResponse from "../interfaces/WeatherResponse.js";

async function getWeatherData(
  query: string,
  units: string
): Promise<WeatherData> {
  try {
    let weatherData: WeatherData;
    const location: LocationResponse = await queryLocation(query);
    const weather: WeatherResponse = await fetchWeather(
      location.lat,
      location.lon,
      units
    );
    if (location.country != "US") location.state = undefined;
    weatherData = new WeatherData(
      location.name,
      location.state,
      location.country,
      weather.main.temp,
      weather.weather[0].main,
      weather.weather[0].id,
      weather.wind.speed,
      weather.main.humidity,
      units
    );
    return weatherData;
  } catch (error: any) {
    console.error(error.message);
    throw new error(error);
  }
}

async function queryLocation(query: string): Promise<LocationResponse> {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`
  );
  const location: LocationResponse = await response.data[0];
  return location;
}

async function fetchWeather(
  lat: number,
  lon: number,
  units: string
): Promise<WeatherResponse> {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.API_KEY}`
  );
  const weather: WeatherResponse = await response.data;
  return weather;
}

export default getWeatherData;