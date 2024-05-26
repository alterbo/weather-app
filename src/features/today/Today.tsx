import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { DayImage } from '../../app/layout/DayImage';
import { locations } from '../location/locations';
import { useTodayStore } from '../../app/context/today-context';
import styles from './Today.module.css';
import { Bevel } from '../../app/layout/Bevel';

export const Today = observer(() => {
    const { locationId } = useParams();
    const location = locations.find(location => location.url === locationId);
    if (!location) return <></>
    const { lat, lon } = location;

    const { fetchToday, today } = useTodayStore();

    useEffect(() => {
        fetchToday(lat, lon);
    }, [fetchToday, lat, lon]);

    return (
        <div className={ styles.today }>
            <h1 className={ styles.title }>
                { 
                    `Now in ${ location.label ?? '' }`
                }
            </h1>
            <div className={ styles.container }>
                <div className={ styles.bg }>
                    <DayImage name={today?.weather[0].id.toString() ?? ''} />
                </div>
                <div className={ styles.frame }>
                    <Bevel match />
                    <div className={ styles.secondary }>
                        <span>{ today?.main.temp_min}º</span>
                    </div>
                    <div className={ styles.main }>
                        <span>{ today?.main.temp}º</span>
                    </div>
                    <div className={ styles.tertiary }>
                        <span>{ today?.main.temp_max}º</span>
                    </div>
                </div>
            </div>
        </div>
    );
});
