import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { locations } from '../location/locations';
import { data } from './week-mock';
import styles from './Week.module.css';

export const Week = () => {
    const { locationId } = useParams();
    const location = locations.find(location => location.url === locationId);
    if (!location) return <></>

    // const { lat, lon } = location;
    const week = data.list;

    console.log('week', week);

    const groupForecastsByDay = (forecasts: Forecast[]): Map<string, Forecast[]> => {
        const groupedForecasts = new Map<string, Forecast[]>();
        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dateText = date.toLocaleDateString('es', { weekday: 'long' });
            const dayForecasts = groupedForecasts.get(dateText) || [];
            groupedForecasts.set(dateText, [...dayForecasts, forecast]);
        });
        return groupedForecasts;
    };

    const getMaxMinTemperature = (forecasts: Forecast[]): [number, number] => {
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        forecasts.forEach(forecast => {
          const temp = forecast.main.temp;
          if (temp > maxTemp) maxTemp = temp;
          if (temp < minTemp) minTemp = temp;
        });
        return [maxTemp, minTemp];
    };

    const getDominantWeatherCondition = (forecasts: Forecast[]): string => {
        const weatherCount = new Map<number, number>();
        forecasts.forEach(forecast => {
          forecast.weather.forEach(condition => {
            const count = weatherCount.get(condition.id) || 0;
            weatherCount.set(condition.id, count + 1);
          });
        });
        const maxCount = Math.max(...Array.from(weatherCount.values()));
        const dominantWeather = Array.from(weatherCount).find(([_, count]) => count === maxCount);
        return dominantWeather ? dominantWeather[0].toString() : '';
    };

    const groupedForecasts = groupForecastsByDay(week);

    const dailyForecasts: DailyForecast[] = [];
    groupedForecasts.forEach((dayForecasts, date) => {
        const [maxTemp, minTemp] = getMaxMinTemperature(dayForecasts);
        const dominantWeather = getDominantWeatherCondition(dayForecasts);
        const weatherIcon = dominantWeather ? `${dominantWeather}.svg` : '';
        dailyForecasts.push({ date, maxTemp, minTemp, weatherIcon });
    });

    dailyForecasts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (
        <div className={ styles.week }>
            <h1>
                { 
                    `Week in ${ location.label ?? '' }`
                }
            </h1>
            <ul>
                {
                    dailyForecasts.map(({ date, maxTemp, minTemp, weatherIcon }) => (
                        <li key={date}>
                            <div>Date:{date}</div>
                            <div>Max: {maxTemp}&#176;C</div>
                            <div>Min: {minTemp}&#176;C</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};