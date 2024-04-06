import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { locations } from '../location/locations';
import { data } from './week-mock';
import styles from './Week.module.css';
import { DayImage } from './DayImage';

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
        const weather = dominantWeather;
        dailyForecasts.push({ date, maxTemp, minTemp, weather });
    });

    dailyForecasts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (
        <div className={ styles.week }>
            <h1 className={ styles.title }>
                { 
                    `Week in ${ location.label ?? '' }`
                }
            </h1>
            <ul className={ styles.list }>
                {
                    dailyForecasts.map(({ date, maxTemp, minTemp, weather }) => (
                        <li className={ styles.item } key={ date }>
                            <DayImage name={ weather } />
                            <div className={ styles.info } >
                                <p className={ styles.values }>
                                    <span>{ minTemp }&#176;</span>
                                    <span>{ maxTemp }&#176;</span>
                                </p>
                                <p>{ date }</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};