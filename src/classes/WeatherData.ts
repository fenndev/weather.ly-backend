export default class WeatherData {
    public cityName: string;
    public stateName: string | undefined;
    public countryName: string;
    public temperature: number;
    public weatherType: string;
    public weatherID: number;
    public windSpeed: number;
    public humidity: number;
    public unitSystem: string;
    public temperatureUnits: string;
    public windSpeedUnits: string;

    constructor(
        city: string,
        state: string | undefined,
        country: string,
        temperature: number,
        weatherType: string,
        weatherID: number,
        windSpeed: number,
        humidity: number,
        unitSystem: string
    ) {
        this.cityName = city;
        this.stateName = state;
        this.countryName = country;
        this.temperature = Number.parseFloat(temperature.toFixed(1));
        this.weatherType = weatherType;
        this.weatherID = weatherID;
        this.windSpeed = Number.parseFloat(windSpeed.toFixed(1));
        this.humidity = humidity;
        this.unitSystem = unitSystem;

        if (unitSystem == 'metric') {
            this.temperatureUnits = '°C';
            this.windSpeedUnits = 'kph';
        } else {
            this.temperatureUnits = '°F';
            this.windSpeedUnits = 'mph';
        }
    }
}
