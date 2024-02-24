import { Link, useLocation } from 'react-router-dom';
import { locations } from './locations';

export const Location = () => {
    const { pathname } = useLocation();

    const checkString = (value: string) => {
        return value === 'location' || value === 'week' || value === 'today';
    };

    return (
        <>
            {
                locations.map(location => (
                    <Link
                        key={ location.id }
                        to={ `/${ checkString(pathname) ? pathname : 'week' }/${ location.url}` }
                    >
                        { location.label }
                    </Link>
                ))
            }
        </>
    );
};