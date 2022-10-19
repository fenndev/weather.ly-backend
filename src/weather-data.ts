import formatDateTime from './format-datetime.js';

class WeatherData {
    public dateTime: string;
    public location: string;
    public weatherCategory: string;
    public weatherDescription: string;
    public temperature: number;
    public humidity: number;
    public pressure: number;
    public windSpeed: number;
    public windDirection: number;
    public sunrise: string;
    public sunset: string;
    public units: string;

    constructor(data: any, units = 'metric') {
        this.dateTime = formatDateTime(new Date((data.dt * 1000) + (data.timezone * 1000)));
        this.location = data.name;
        this.weatherCategory = data.weather[0].main;
        this.weatherDescription = data.weather[0].description;
        this.temperature = this.truncate(data.main.temp);
        this.humidity = this.truncate(data.main.humidity);
        this.pressure = this.truncate(data.main.pressure);
        this.windSpeed = this.truncate(data.wind.speed);
        this.windDirection = this.truncate(data.wind.deg);
        this.sunrise = formatDateTime(new Date((data.sys.sunrise * 1000) + (data.timezone * 1000)));
        this.sunset = formatDateTime(new Date((data.sys.sunset * 1000) + (data.timezone * 1000)));
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


export default WeatherData;