import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import getWeatherData from './functions/QueryWeather.js';
import * as dotenv from 'dotenv';
import WeatherData from './classes/WeatherData.js';
dotenv.config();
const app = express();
const allowedOrigins = [
    'https://weather-ly-fenndev.vercel.app',
    'https://weather-ly-weld.vercel.app',
    'https://weather-ly-git-main-fenndev.vercel.app',
];
const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (origin && allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Request sent from an unauthorized domain.`));
        }
    },
    methods: 'GET',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', async (req, res, next) => {
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
        next(err);
    }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.message === 'Request sent from an unauthorized domain.') {
        const domain = req.headers.origin || 'Unknown domain';
        res.status(403).send(
            `Request sent from an unauthorized domain: ${domain}`
        );
    } else {
        // Set a default status code and error message
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        const errorMessage = 'Internal Server Error';

        // Send the error response
        res.status(statusCode).send(errorMessage);
    }
});

app.listen(process.env.PORT, () => {
    if (process.env.PORT)
        console.log(`Server started on port ${process.env.PORT}`);
});
