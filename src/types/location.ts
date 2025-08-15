import * as z from "zod/v4";

export const Coord = z.object({
    lat: z.number().gte(-90).lte(90),
    lon: z.number().gte(-180).lte(180),
});

export type Coord = z.infer<typeof Coord>;

export const City = z.object({
    id: z.number(),
    name: z.string(),
    state: z.string().optional(),
    country: z.string(),
    coord: Coord,
});

export type City = z.infer<typeof City>;

export const Cities = z.array(City);

export type Cities = z.infer<typeof Cities>;
