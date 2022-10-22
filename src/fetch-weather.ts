import fetch from 'node-fetch';
import WeatherData from './weather-data.js';



async function queryWeather(lat: number, lon: number): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
    const response = await (await fetch(url)).json();
    return new WeatherData(response);
}

export default queryWeather;