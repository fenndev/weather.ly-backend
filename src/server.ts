import express, { query } from 'express';
import cors from 'cors'
import queryWeather from './query-weather.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.get('/', async(req: any, res) => {
  if(!req.query.q) res.send('Server online.');
  else {
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
});