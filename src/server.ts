import express, { query } from 'express';
import queryWeather from './query-weather.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, async() => {
    console.log(`Server started on port ${process.env.PORT}`);
});

app.get('/:query', async(req: any, res) => {
  try {
    let queryString = req.params.query;
    let queryArray = queryString.split(',');
    const weatherData = await queryWeather(queryArray);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(weatherData);
  }
  catch (err) {
    res.send(err);
  }
  
});