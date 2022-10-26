import express, { query } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dotenv.config();
dayjs.extend(utc);

const app = express();

export default async function queryHandler(req: any, res: any) {
    let queryString = req.params.query;
    let queryArray = queryString.split(',');
    const weatherData = await queryWeather(queryArray);
    console.log(weatherData);
    res.status(200).json({
      body: weatherData
    });
};




function formatDateTime(utcTime: number, timezoneOffset: number): Date { 
    return dayjs.utc(dayjs.unix(utcTime)).utcOffset(timezoneOffset / 60).toDate();
}


async function queryWeather(query: string): Promise<WeatherData> {
  const geolocateURL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`;
  const geolocateResponse: any = await (await axios.get(geolocateURL)).data;  //(await fetch(geolocateURL)).json();
  console.log(geolocateResponse);
  const { lat, lon } = geolocateResponse[0];
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
  const weatherResponse: any = await (await axios.get(weatherURL)).data;
  if(geolocateResponse[0].state != weatherResponse.name) weatherResponse.state = geolocateResponse[0].state;
  return new WeatherData(weatherResponse);
}

class WeatherData {
  public dateTime: Date;
  public city: string;
  public state?: string;
  public country: string;
  public category: string;
  public description: string;
  public temperature: number;
  public humidity: number;
  public pressure: number;
  public windSpeed: number;
  public windDirection: number;
  public sunrise: Date;
  public sunset: Date;
  public units: string;

  constructor(data: any, units = 'metric') {
      this.dateTime = formatDateTime(data.dt, data.timezone);
      this.city = data.name;
      if(data.state) this.state = data.state;
      this.country = data.sys.country;
      this.category = data.weather[0].main;
      this.description = data.weather[0].description.replace(/(^\w{1})|(\s+\w{1})/g, (letter: string) => letter.toUpperCase());;
      this.temperature = this.truncate(data.main.temp);
      this.humidity = this.truncate(data.main.humidity);
      this.pressure = this.truncate(data.main.pressure);
      this.windSpeed = this.truncate(data.wind.speed);
      this.windDirection = this.truncate(data.wind.deg);
      this.sunrise = formatDateTime(data.sys.sunrise, data.timezone);
      this.sunset = formatDateTime(data.sys.sunset, data.timezone);
      this.units = units;
  }

  public convertUnits(): void {
      if (this.units === 'metric') {
          this.temperature = this.truncate((this.temperature * (9 / 5) + 32));
          this.windSpeed = this.truncate(this.windSpeed * 2.23694);
          this.units = 'imperial';
      }
      else if (this.units === 'imperial') {
          this.temperature = this.truncate((this.temperature - 32) * (5 / 9));
          this.windSpeed = this.truncate(this.windSpeed * 1.609344);
          this.units = 'metric';
      }
  };

  private truncate(num: number): number { return parseFloat(num.toFixed(2)) };
};

module.exports = queryHandler;