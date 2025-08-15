import React from 'react';
import { SettingProvider } from './AppSettingProvider';
import { WeatherContextProvider } from './WeatherContextProvider';
import { Header } from './Header';
import { Content } from './Content';
import { CurrentWeather } from './CurrentWeather';
import { Test } from './Test';
// import { HourlyForecast } from './HourlyForecast';
// import { DailyForecast } from './DailyForecast';

export function App() {
    return (
        <SettingProvider>
            <WeatherContextProvider>
                <Test />
                <Header />
                <Content>
                    <CurrentWeather />
                    <CurrentWeather />
                    <CurrentWeather />
                </Content>
            </WeatherContextProvider>
        </SettingProvider>
    );
}