export default interface WeatherResponse {
    main: {
        temp: number;
        humidity: number;
        pressure: number;
    };
    weather: [
        {
            main: string;
            id: number;
        }
    ];
    wind: {
        speed: number;
    };
}
