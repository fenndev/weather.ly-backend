import fetch from 'node-fetch';

async function geolocateByCity(city?: string): Promise<any> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
    const response: any = await (await fetch(url)).json();
    console.log(response[0])
    return {newLat: response[0].lat, newLong: response[0].lon};
}

// async function geolocateByZipCode(zipCode: number): Promise<any> {

// }

export default geolocateByCity;