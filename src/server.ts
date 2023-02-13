import express, { query } from 'express';
import cors from 'cors'
import getWeatherData from './functions/QueryWeather.js';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());

app.get('/', async(req: any, res) => {
  if(!req.query.q) res.send('Server online.');
  try {
    let queryString = req.query.q;
    let queryArray = queryString.split(',');
    let unitSystem = req.query.units;
    const weatherData = await getWeatherData(queryArray, unitSystem);
    res.send(weatherData);
  }
  catch (err) {
    res.send(err);
  }
})

app.listen(process.env.PORT, async() => {
    console.log(`Server started on port ${process.env.PORT}`);
});