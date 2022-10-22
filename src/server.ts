import express, { query } from 'express';
import WeatherData from './weather-data.js';
import queryWeather from './fetch-weather.js';
import * as dotenv from 'dotenv';
import geolocate from './geolocate.js';
dotenv.config();

const app = express();
const lat = 55.7558;
const lon = 37.6173;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, async() => {
    console.log(`Server started on port ${process.env.PORT}`);
    const {newLat, newLong} = await geolocate('Tacoma, Washington');
    const weatherData = await queryWeather(newLat, newLong);
    console.log(weatherData);
});

app.get('/:query', async(req: any, res) => {
  let queryString = req.params.query;
  let queryArray = queryString.split(',');
  const {newLat, newLong} = await geolocate(queryArray);
  const weatherData = await queryWeather(newLat, newLong);
  res.send(weatherData);
});