import { citiesBaseUrl, currentWeatherBaseUrl } from '@resources/config';
import { Coord, City, Cities } from '@typesLocal/location';
import { Unit, Units } from '@typesLocal/units';
import { CurrentWeather, CurrentWeatherData } from '@typesLocal/weather';
import { sendRequest } from '@api/sendRequest';

export async function getCurrentWeather(
    coords: Coord,
    units: Unit[]
): Promise<CurrentWeatherData> {
    const baseUrl = `${currentWeatherBaseUrl}?lat=${coords.lat}&lon=${coords.lon}`;
    const requestUrls = units.map(u => `${baseUrl}&units=${u}`);
    const requests = requestUrls.map(url => sendRequest(url));

    let results: unknown[];
    try {
        results = await Promise.all(requests);
    } catch (e) {
        throw new Error(`Ошибка запросов ${requestUrls} в API при получении погодных данных: ${e}`);
    }

    const weatherMap = units.reduce<Record<Unit, CurrentWeather>>(
        (acc, unit, index) => {
            const parsed = CurrentWeather.safeParse(results[index]);
            if (!parsed.success) {
                console.log("Полученные данные", results[index]);
                throw new Error(`Ошибка парсинга погоды (${unit}): ${JSON.stringify(parsed.error.format(), null, 2)}.`);
            }
            acc[unit] = parsed.data;
            return acc;
        },
        {} as Record<Unit, CurrentWeather>
    );

    return weatherMap;
}