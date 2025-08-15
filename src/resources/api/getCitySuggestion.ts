import { citiesBaseUrl } from '@resources/config';
import { City, Cities } from '@typesLocal/location';
import { sendRequest } from '@api/sendRequest';


export async function getCitySuggestion(query: string): Promise<City[]> {
    const reqUrl = `${citiesBaseUrl}cities/search?q=${encodeURIComponent(query)}`;
    let cities: unknown[];

    try {
        cities =  await sendRequest(`${citiesBaseUrl}cities/search?q=${encodeURIComponent(query)}`);
    } catch(e) {
        throw new Error(`Ошибка запроса в API при получении городов для подсказки: ${e}. Запрос: ${reqUrl}` );
    }

    const parsed = Cities.safeParse(cities);

    if (!parsed.success){
        throw new Error(`Ошибка парсинга списка городов: ${JSON.stringify(parsed.error.format(), null, 2)}`);
    }

    return parsed.data;
}