import { Link, useLocation } from 'react-router-dom';
import { locations } from './locations';
import styles from './Location.module.css';
import { LocationImage } from './LocationImage';
import { Bevel } from '../../app/layout/Bevel';

export const Location = () => {
    const { pathname } = useLocation();

    const checkString = (value: string) => {
        return value === 'location' || value === 'week' || value === 'today';
    };

    return (
        <>
            {
                locations.map(location => (
                    <div className={ styles.container } key={ location.id }>
                        <Bevel match={false} />
                        <LocationImage name={ location.url } />
                        <Link
                            className={ styles.link }
                            to={ `/${ checkString(pathname) ? pathname : 'week' }/${ location.url}` }
                        >
                            <span>{ location.role }</span>
                            <span>{ location.label }</span>
                        </Link>
                    </div>
                ))
            }
        </>
    );
};