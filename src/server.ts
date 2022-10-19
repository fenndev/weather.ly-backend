import express from 'express';
import fetch from 'node-fetch';
import WeatherData from './weather-data';
import {} from 'dotenv/config';

const app = express();
const lat = 40.7128;
const lon = -74.0060;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    getWeatherData(lat, lon).then(data => console.log(data));
});

async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
    const response = await (await fetch(url)).json();
    return new WeatherData(response);
}