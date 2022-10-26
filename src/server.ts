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

export default async function queryHandler(req: any, res: any) {
    let queryString = req.params.query;
    let queryArray = queryString.split(',');
    const weatherData = await queryWeather(queryArray);
    console.log(weatherData);
    res.status(200).json({
      body: weatherData
    });
};

module.exports = queryHandler;