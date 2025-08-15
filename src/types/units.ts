import * as z from "zod/v4";

export const Unit = z.enum(["metric", "imperial", "standard"]);
export type Unit = z.infer<typeof Unit>;

export const Units = z.object({
  temperature: Unit,
  windSpeed: Unit,
});

export type Units = z.infer<typeof Units>;

