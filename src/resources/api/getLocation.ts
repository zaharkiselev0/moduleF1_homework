import { citiesBaseUrl, currentWeatherBaseUrl } from '@resources/config';
import { Coord, City, Cities } from '@typesLocal/location';
import { Unit, Units } from '@typesLocal/units';
import { CurrentWeather, CurrentWeatherData } from '@typesLocal/weather';

export function getLocation(): Promise<Coord> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Геолокация не поддерживается'));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(Coord.parse({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                }));
            },
            (error) => {
                reject(new Error(`Ошибка определения местоположения: ${error.message}`));
            }
        );
    });
}