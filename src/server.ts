import express, { query } from 'express';
import queryWeather from './query-weather.js';
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
    const weatherData = await queryWeather('Moscow');
    console.log(weatherData);
});

app.get('/:query', async(req: any, res) => {
  let queryString = req.params.query;
  let queryArray = queryString.split(',');
  const weatherData = await queryWeather(queryArray);
  res.send(weatherData);
});