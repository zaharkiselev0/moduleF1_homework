import React from 'react';
import { useContext } from 'react';
import { getWeatherNotifications, NotificationStyle } from '@resources/getWeatherNotifications';

export function WeatherNotifications({notifications}: {notifications: [string, NotificationStyle][]}) {
    return (
        <ul className="notifications">
            {notifications.map(([text, style], i) => (
                <li key={i} className={`notification ${style}`}>
                    {text}
                </li>
            ))}
        </ul>
    );
}