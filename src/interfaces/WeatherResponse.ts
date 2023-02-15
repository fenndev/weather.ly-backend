export default interface WeatherResponse {
    main: {
        temp: number;
        humidity: number;
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
