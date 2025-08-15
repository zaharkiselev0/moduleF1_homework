import React, { JSX } from "react";
import { useState, createContext, useContext, useEffect } from 'react';
import { CityContext, UnitsContext} from './AppSettingProvider';
import { WeatherData } from '@typesLocal/weather';
import { getCurrentWeather } from '@api/getCurrentWeather';
import { getForecastWeather } from '@api/getForecastWeather';
import { weatherUpdateSec } from '@resources/config';

type WeatherContextType = {
    data: WeatherData | null;
    loading: boolean;
};

export const WeatherContext = createContext<WeatherContextType>({data: null, loading: false});

export function WeatherContextProvider({ children, updateSec = weatherUpdateSec}: { children: React.ReactNode, updateSec?: number }) {
    const [data, setData] = useState<WeatherData>({current: null, forecast: null});
    const [loading, setLoading] = useState(false);
    const city = useContext(CityContext);
    const units = useContext(UnitsContext);
    const coords = city?.coord;

    async function loadData(){
        console.log("Попытка обновить погодные данные.");
        setLoading(true);
        try{
            if(!coords){
                throw new Error("Невозможно обновить данные погоды, так как координаты не определены.");
            }
            const unitsArr = Object.values(units);
            const current = await getCurrentWeather(coords, unitsArr);
            const forecast = await getForecastWeather(coords, unitsArr);
            setData({current, forecast});
            console.log("Погодные данные успешно обновлены.");
        } catch(e) {
            console.error("Ошибка получения погодных данных: " + e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(!coords){
            throw new Error("Невозможно обновить данные погоды, так как координаты не определены.");
        }
        loadData();
        const timerId = setInterval(loadData, updateSec * 1000);
        return () => clearInterval(timerId);
    }, [coords?.lat, coords?.lon, units, updateSec]);

    return (
        <WeatherContext value={{data, loading}}>
            {children}
        </WeatherContext>
    );
}