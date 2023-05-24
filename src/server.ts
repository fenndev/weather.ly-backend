import express from 'express';
import cors from 'cors';
import getWeatherData from './functions/QueryWeather.js';
import * as dotenv from 'dotenv';
import getErrorMessage from './functions/GetErrorMessage.js';
import WeatherData from './classes/WeatherData.js';
dotenv.config();
const app = express();
const corsOptions = {
    origin: [
        'https://weather-ly-fenndev.vercel.app',
        'https://weather-ly-weld.vercel.app',
        'https://weather-ly-git-main-fenndev.vercel.app',
    ],
    methods: 'GET',
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', cors(corsOptions), async (req, res) => {
    if (!req.query.q) res.send('Server online.');
    try {
        const queryString: string = encodeURIComponent(req.query.q as string);
        const unitSystem = encodeURIComponent(req.query.units as string);
        const weatherData: WeatherData = await getWeatherData(
            queryString,
            unitSystem
        );
        res.send(weatherData);
    } catch (err) {
        res.statusCode = 404;
        res.send(getErrorMessage(err));
    }
});

app.listen(process.env.PORT, () => {
    if (process.env.PORT)
        console.log(`Server started on port ${process.env.PORT}`);
});
