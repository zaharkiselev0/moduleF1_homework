import React from 'react';
import { createContext, useContext } from 'react';
import { WeatherBlock } from './WeatherBlock';
import { Button } from './Button';
import { Value } from './Value';
import { WeatherContext } from './WeatherContextProvider';
import { getWeatherNotifications } from '@resources/getWeatherNotifications';
import { WeatherNotifications } from './WeatherNotifications';
import { WeatherTypesContext, UnitsContext } from './AppSettingProvider';
import { getWeatherValue } from '@resources/getWeatherValue';

export function CurrentWeather() {
    const {data, loading} = useContext(WeatherContext);
    const weatherTypes = useContext(WeatherTypesContext);
    const units = useContext(UnitsContext);
    const current = data?.current;
    const forecast = data?.forecast;
    const unit = units.temperature;


    const notifications = current?.[unit] && forecast?.[unit] ?
        getWeatherNotifications({current: current[unit], forecast: forecast[unit], unit}):
        null;

    if(current){
        const values = weatherTypes.map(type => {
            try{
                const {text, icon} = getWeatherValue({type, units, weatherData: current});
                return <Value text={text} icon={icon} key={type} />;
            } catch(e) {
                if(!loading){
                    console.error(`Внутренняя ошибка извлечения данных для ${type}: ${e}`);
                }
                return null;
            }
        });

        return (
            <WeatherBlock title="Текущая погода" titleButton={<Button />}>
                <div className="current-weather-grid">
                    {values}
                </div>
                {notifications && <WeatherNotifications notifications={notifications}/>}
            </WeatherBlock>
        );
    };

    return (
        <>
            <span>Нет данных!</span>
        </>
    );
}