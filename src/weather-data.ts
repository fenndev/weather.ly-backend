import formatDateTime from './format-datetime.js';

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


export default WeatherData;