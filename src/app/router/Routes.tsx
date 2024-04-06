import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import { Location } from '../../features/location/Location';
import { Today } from '../../features/today/Today';
import { Week } from '../../features/week/Week';

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
                element: <Week />,
            },
        ],
    }
];

export const router = createBrowserRouter(routes);