import * as z from "zod/v4";
import { Unit } from './units';

const WeatherSchema = z.array(
    z.object({
        description: z.string(),
    })
);

const MainWeatherSchema = z.object({
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
});

const WindSchema = z.object({
    speed: z.number(),
    deg: z.number(),
    gust: z.number().optional(),
});

const CloudsSchema = z.object({
    all: z.number(),
});

const Rain1hSchema = z.object({ "1h": z.number() });
const Snow1hSchema = z.object({ "1h": z.number() });

const Rain3hSchema = z.object({ "3h": z.number() });
const Snow3hSchema = z.object({ "3h": z.number() });

const BaseWeatherSchema = z.object({
    weather: WeatherSchema,
    main: MainWeatherSchema,
    wind: WindSchema,
    clouds: CloudsSchema,
    visibility: z.number(),
    dt: z.number(),
});

export const CurrentWeather = BaseWeatherSchema.extend({
    rain: Rain1hSchema.optional(),
    snow: Snow1hSchema.optional(),
});
export type CurrentWeather = z.infer<typeof CurrentWeather>;

export type CurrentWeatherData = Partial<Record<Unit, CurrentWeather>>;

const ForecastWeatherEntry = BaseWeatherSchema.extend({
    rain: Rain3hSchema.optional(),
    snow: Snow3hSchema.optional(),
});

export const ForecastWeather = z.object({
    list: z.array(ForecastWeatherEntry),
});
export type ForecastWeather = z.infer<typeof ForecastWeather>;

export type ForecastWeatherData = Partial<Record<Unit, ForecastWeather>>;

export type WeatherData = {
    'current': CurrentWeatherData | null,
    'forecast': ForecastWeatherData | null,
};
