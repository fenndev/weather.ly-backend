import fetch from 'node-fetch';

async function geolocate(city: string | null = null, state: string | null = null, country: string | null = null) {
    let queryString = '';
    for(const item of arguments) if (item) queryString += item + ',';
    queryString = queryString.slice(0, -1);
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${queryString}&limit=1&appid=${process.env.API_KEY}`;
    const response: any = await (await fetch(url)).json();
    console.log(response[0])
    return {newLat: response[0].lat, newLong: response[0].lon};
}

export default geolocate;