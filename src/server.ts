import express from 'express';
import cors from 'cors';
import getWeatherData from './functions/QueryWeather.js';
import * as dotenv from 'dotenv';
import getErrorMessage from './functions/GetErrorMessage.js';
import WeatherData from './classes/WeatherData.js';
dotenv.config();
const app = express();
app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', async (req, res) => {
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
