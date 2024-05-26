import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import { Location } from '../../features/location/Location';
import { WeekForecast } from '../../features/week/WeekForecast';
import { TodayForecast } from '../../features/today/TodayForecast';

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
                element: <TodayForecast />,
            },
            {
                path: 'week/:locationId',
                element: <WeekForecast />,
            },
        ],
    }
];

export const router = createBrowserRouter(routes);