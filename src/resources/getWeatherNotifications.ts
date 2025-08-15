import { CurrentWeather, ForecastWeather } from '@typesLocal/weather';
import { Unit } from '@typesLocal/units';

export type NotificationStyle = 'danger' | 'positive' | 'negative';
export function getWeatherNotifications({current, forecast, unit}: {current: CurrentWeather, forecast: ForecastWeather, unit: Unit}): [string, NotificationStyle][] {
    return [
        ['Жарко', 'positive'],
        ['В течсении 3 часов ожидается снег', 'danger'],
        ['Скоро пойдет дождь', 'negative']
    ]
}