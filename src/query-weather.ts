import fetch from 'node-fetch';
import WeatherData from './weather-data.js';

async function queryWeather(query: string): Promise<WeatherData> {
    const geolocateURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`;
    const geolocateResponse: any = await (await fetch(geolocateURL)).json();
    const { lat, lon } = geolocateResponse[0];
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
    const weatherResponse: any = await (await fetch(weatherURL)).json();
    if(geolocateResponse[0].state != weatherResponse.name) weatherResponse.state = geolocateResponse[0].state;
    return new WeatherData(weatherResponse);
}

export default queryWeather;