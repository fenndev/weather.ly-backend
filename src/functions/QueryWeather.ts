import axios from 'axios';
import WeatherData from '../classes/WeatherData.js';
import LocationResponse from '../interfaces/LocationResponse.js';
import WeatherResponse from '../interfaces/WeatherResponse.js';
import getErrorMessage from './GetErrorMessage.js';

async function getWeatherData(
    query: string,
    units: string
): Promise<WeatherData> {
    try {
        const location: LocationResponse = await queryLocation(query);
        const weather: WeatherResponse = await fetchWeather(
            location.lat,
            location.lon,
            units
        );
        if (location.country != 'US') location.state = undefined;
        return new WeatherData(
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
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
}

async function queryLocation(query: string): Promise<LocationResponse> {
    if (process.env.API_KEY) {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`
        );
        const location: LocationResponse = (
            (await response.data) as LocationResponse[]
        )[0];
        return location;
    } else throw new Error('No API key provided.');
}

async function fetchWeather(
    lat: number,
    lon: number,
    units: string
): Promise<WeatherResponse> {
    if (process.env.API_KEY) {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.API_KEY}`
        );
        const weather: WeatherResponse =
            (await response.data) as WeatherResponse;
        return weather;
    } else throw new Error('No API key provided.');
}

export default getWeatherData;
