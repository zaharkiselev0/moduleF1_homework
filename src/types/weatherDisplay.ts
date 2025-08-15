import * as z from "zod/v4";

export const WeatherDisplay = z.enum(['temp', 'wind', 'humidity']);

export type WeatherDisplay = z.infer<typeof WeatherDisplay>;