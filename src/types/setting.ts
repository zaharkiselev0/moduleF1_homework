import * as z from "zod/v4";
import { Units } from './units';
import { City } from './location';
import { WeatherDisplay } from './weatherDisplay';
import * as defaultSettings from '@resources/defaultSettings';

export type Setting<T> = {
    name: string,
    zodSchema: z.ZodType<T>,
    defaultValue: T,
};

export const unitsSetting: Setting<Units> = {
    name: "units",
    zodSchema: Units,
    defaultValue: defaultSettings.units,
};

export const citySetting: Setting<City> = {
    name: "city",
    zodSchema: City,
    defaultValue: defaultSettings.city,
};

export const weatherTypesSetting: Setting<WeatherDisplay[]> = {
    name: "weatherTypes",
    zodSchema: z.array(WeatherDisplay) as z.ZodType<WeatherDisplay[]>,
    defaultValue: defaultSettings.weatherTypes,
};
