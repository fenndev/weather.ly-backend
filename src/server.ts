import express, { query } from 'express';
import cors from 'cors'
import queryWeather from './query-weather.js';
import * as dotenv from 'dotenv';
dotenv.config();
import WeatherData from './classes/WeatherData.js';
import sanitizeQuery from './functions/SanitizeQuery.js';
import RateLimiter from './classes/RateLimiter.js';
const app = express();
let rateLimiter: RateLimiter;
app.use(cors());

app.get('/', async(req: any, res) => {
  if(!req.query.q) res.send('Server online.');
  if(!rateLimiter.isRateLimitReached()) {
    try {
      let queryString = req.query.q;
      let queryArray = queryString.split(',');
      const weatherData = await queryWeather(queryArray);
      res.send(weatherData);
    }
    catch (err) {
      res.send(err);
    }
  }
})

app.listen(process.env.PORT, async() => {
    console.log(`Server started on port ${process.env.PORT}`);
    rateLimiter = new RateLimiter();
});