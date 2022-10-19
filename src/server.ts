import express from 'express';
import fetch from 'node-fetch';
import WeatherData from './weather-data.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const lat = 55.7558;
const lon = 37.6173;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, async() => {
    console.log(`Server started on port ${process.env.PORT}`);
    const weatherData = await getWeatherData(lat, lon);
    console.log(weatherData);
});

async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
    const response = await (await fetch(url)).json();
    return new WeatherData(response);
}