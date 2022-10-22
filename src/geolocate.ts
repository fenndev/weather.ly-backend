import fetch from 'node-fetch';

async function geolocate(query: string): Promise<any> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.API_KEY}`;
    const response: any = await (await fetch(url)).json();
    return {newLat: response[0].lat, newLong: response[0].lon};
}

export default geolocate;