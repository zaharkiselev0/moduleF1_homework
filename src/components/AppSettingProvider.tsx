import React from 'react';
import { useContext, createContext } from 'react';
import { unitsSetting, citySetting, weatherTypesSetting} from "@typesLocal/setting";
import { useSetting } from '@hooks/useSetting';
import { Units } from "@typesLocal/units";
import { City } from "@typesLocal/location";
import { WeatherDisplay } from "@typesLocal/weatherDisplay";


export const UnitsContext = createContext<Units>(undefined!);
export const SetUnitsContext = createContext<React.Dispatch<React.SetStateAction<Units>>>(undefined!);

export const CityContext = createContext<City | null>(null);
export const SetCityContext = createContext<React.Dispatch<React.SetStateAction<City>>>(undefined!);

export const WeatherTypesContext = createContext<WeatherDisplay[]>(undefined!);
export const SetWeatherTypesContext = createContext<React.Dispatch<React.SetStateAction<WeatherDisplay[]>>>(undefined!);

export function SettingProvider({ children }: { children: React.ReactNode }) {
    const [units, setUnits] = useSetting(unitsSetting);
    const [city, setCity] = useSetting(citySetting);
    const [weatherTypes, setWeatherTypes] = useSetting(weatherTypesSetting);

    return (
        <UnitsContext value={units}>
        <SetUnitsContext value={setUnits}>

        <CityContext value={city}>
        <SetCityContext value={setCity}>

        <WeatherTypesContext value={weatherTypes}>
        <SetWeatherTypesContext value={setWeatherTypes}>

            {children}

        </SetWeatherTypesContext>
        </WeatherTypesContext>

        </SetCityContext>
        </CityContext>

        </SetUnitsContext>
        </UnitsContext>
    );
}