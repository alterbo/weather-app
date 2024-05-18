import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import { Location } from '../../features/location/Location';
import { Today } from '../../features/today/Today';
import { WeekForecast } from '../../features/week/WeekForecast';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: ':locationId?',
                element: <Location />,
            },
            {
                path: 'today/:locationId',
                element: <Today />,
            },
            {
                path: 'week/:locationId',
                element: <WeekForecast />,
            },
        ],
    }
];

export const router = createBrowserRouter(routes);