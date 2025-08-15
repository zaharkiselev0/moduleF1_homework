import React, { JSX } from "react";
import { createContext, useContext } from 'react';
import { Units } from '@typesLocal/units';
import { CurrentWeatherData } from '@typesLocal/weather';
import * as icons from '@components/icons/all';
import { WeatherDisplay } from "@typesLocal/weatherDisplay";

export function getWeatherValue({type, weatherData, units}: {type: WeatherDisplay, weatherData: CurrentWeatherData, units: Units}): { text: string, icon: JSX.Element } {
    if (!weatherData) {
        throw new Error(`Нет погодных данных`);
    }

    const defaultUnit = units['temperature'];
    switch (type) {
        case 'temp': {
            const unit = units['temperature'];
            if(!weatherData[unit]){
                throw new Error(`Нет данных для температуры в единицах измерения: ${unit}`);
            }
            const value = weatherData[unit].main.temp;
            const unitChar = {'metric': '°C', 'imperial': '°F', 'standard': 'K'}
            return {text: `${value} ${unitChar[unit]}`, icon: (<icons.SunIcon />)};
        }
        case 'wind': {
            const unit = units['windSpeed'];
            if(!weatherData[unit]){
                throw new Error(`Нет данных для скорости ветра в единицах измерения: ${unit}`);
            }
            const value = weatherData[unit].wind.speed;
            const unitChar = {'metric': 'м/c', 'imperial': 'mph', 'standard': 'м/c'}
            return {text: `${value} ${unitChar[unit]}`, icon: (<icons.SunIcon />)};
        }
        case 'humidity': {
            if(!weatherData[defaultUnit]){
                throw new Error(`Нет данных для влажности в единицах измерения: ${defaultUnit}`);
            }
            const value = weatherData[defaultUnit].main.humidity;
            return {text: `${value}%`, icon: (<icons.SunIcon />)};
        }
        default:
            throw new Error(`Неизвестный тип погодных данных: ${type}`);
    }
}
