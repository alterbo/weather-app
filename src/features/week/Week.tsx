import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { locations } from '../location/locations';
import styles from './Week.module.css';
import { DayImage } from '../../app/layout/DayImage';
import { Bevel } from '../../app/layout/Bevel';
import { observer } from 'mobx-react-lite';
import { useWeekStore } from '../../app/context/week-context';
import { DailyForecast, Forecast } from '../../app/models/forecast';

export const Week = observer(() => {
    const { locationId } = useParams();
    const location = locations.find(location => location.url === locationId);
    if (!location) return <></>
    const { lat, lon } = location;

    const { fetchWeek, week } = useWeekStore();

    useEffect(() => {
        fetchWeek(lat, lon);
    }, [fetchWeek, lat, lon]);

    const groupForecastsByDay = (forecasts: Forecast[]): Map<string, Forecast[]> => {
        const groupedForecasts = new Map<string, Forecast[]>();
        forecasts?.forEach(forecast => {
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

    const getDominantWeatherConditions = (forecasts: Forecast[]): string[] => {
        const weatherCount = new Map<number, number>();
        forecasts.forEach(forecast => {
          forecast.weather.forEach(condition => {
            const count = weatherCount.get(condition.id) || 0;
            weatherCount.set(condition.id, count + 1);
          });
        });
        const sortedWeather = Array.from(weatherCount.entries()).sort((a, b) => b[1] - a[1]);
        const dominantWeather = sortedWeather.slice(0, 3).map(([weatherId]) => weatherId.toString());
        return dominantWeather;
    };

    const groupedForecasts = groupForecastsByDay(week);

    const dailyForecasts: DailyForecast[] = [];
    groupedForecasts.forEach((dayForecasts, date) => {
        const [maxTemp, minTemp] = getMaxMinTemperature(dayForecasts);
        const dominantWeather = getDominantWeatherConditions(dayForecasts);
        dailyForecasts.push({ date, maxTemp, minTemp, dominantWeather });
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
                    dailyForecasts.map(({ date, maxTemp, minTemp, dominantWeather }) => (
                        <li className={ styles.item } key={ date }>
                            <div className={ styles.frame }>
                                <Bevel match />
                                <div className={ styles.weather }>
                                    {dominantWeather.map((weather, index) => (
                                        <DayImage key={index} name={weather} />
                                    ))}
                                </div>
                            </div>
                            <div className={ styles.content }>
                                <h2 className={ styles.date }>{ date }</h2>
                                <div className={ styles.info } >
                                    <p className={ styles.values }>
                                        <span>{ minTemp }&#176;</span>
                                        <span>{ maxTemp }&#176;</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
});
