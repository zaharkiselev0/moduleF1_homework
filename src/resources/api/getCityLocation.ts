import { citiesBaseUrl } from '@resources/config';
import { City } from '@typesLocal/location';
import { sendRequest } from '@api/sendRequest';


export async function getCityLocation(cityId: number): Promise<City> {
    const reqUrl = `${citiesBaseUrl}cities/${cityId}/`;
    let city: unknown;

    try {
        city =  await sendRequest(reqUrl);
    }
    catch(e) {
        throw new Error(`Ошибка запроса в API при получении города: ${e}. Запрос: ${reqUrl}` );
    }

    const parsed = City.safeParse(city);

    if (!parsed.success) {
        throw new Error(`Ошибка парсинга города: ${JSON.stringify(parsed.error.format())}`);
    }

    return parsed.data;
}