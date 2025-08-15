import { citiesBaseUrl, forecastWeatherBaseUrl } from '@resources/config';
import { Coord, City, Cities } from '@typesLocal/location';
import { Unit, Units } from '@typesLocal/units';
import { ForecastWeather, ForecastWeatherData } from '@typesLocal/weather';
import { sendRequest } from '@api/sendRequest';


export async function getForecastWeather(
    coords: Coord,
    units: Unit[]
): Promise<ForecastWeatherData> {
    const baseUrl = `${forecastWeatherBaseUrl}?lat=${coords.lat}&lon=${coords.lon}`;
    const requestUrls = units.map(u => `${baseUrl}&units=${u}`);
    const requests = requestUrls.map(url => sendRequest(url));

    let results: unknown[];
    try {
        results = await Promise.all(requests);
    } catch (e) {
        throw new Error(`Ошибка запросов ${requestUrls} в API при получении погодных данных: ${e}`);
    }

    const weatherMap = units.reduce<Record<Unit, ForecastWeather>>(
        (acc, unit, index) => {
            const parsed = ForecastWeather.safeParse(results[index]);
            if (!parsed.success) {
                console.log("Полученные данные", results[index]);
                throw new Error(`Ошибка парсинга погоды (${unit}): ${JSON.stringify(parsed.error.format(), null, 2)}.`);
            }
            acc[unit] = parsed.data;
            return acc;
        },
        {} as Record<Unit, ForecastWeather>
    );

    return weatherMap;
}