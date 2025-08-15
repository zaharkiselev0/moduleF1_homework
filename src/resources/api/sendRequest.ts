import { citiesBaseUrl, currentWeatherBaseUrl } from '@resources/config';
import { Coord, City, Cities } from '@typesLocal/location';
import { Unit, Units } from '@typesLocal/units';
import { CurrentWeather, CurrentWeatherData } from '@typesLocal/weather';

export async function sendRequest(url: string): Promise<any> {
    const config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    return data;
}