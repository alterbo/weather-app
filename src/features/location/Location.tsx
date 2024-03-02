import { Link, useLocation } from 'react-router-dom';
import { locations } from './locations';
import styles from './Location.module.css';
import { LocationImage } from './LocationImage';

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