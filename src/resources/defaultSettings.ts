import { Units } from '@typesLocal/units';
import { City } from '@typesLocal/location';
import { WeatherDisplay } from '@typesLocal/weatherDisplay';

export const city: City = {
    id: 524894,
    name: "Moscow",
    country: "RU",
    coord: {
        lat: 37.606667,
        lon: 55.761665,
    },
};

export const units: Units = {
  temperature: "metric",
  windSpeed: "metric"
};

export const weatherTypes: WeatherDisplay[] = ['temp', 'wind', 'humidity'];

