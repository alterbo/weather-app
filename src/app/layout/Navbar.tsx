import { NavLink, useParams } from 'react-router-dom';

export const Navbar = () => {
    const { locationId } = useParams();
    const setLocation = locationId && locationId.length > 1 ? locationId :  'center';
    return (
        <>
            <NavLink
                to={ `/${ setLocation }` }
            >
                Location
            </NavLink>
            <NavLink
                to={ `/week/${ setLocation }` }
            >
                Week
            </NavLink>
            <NavLink
                to={ `/today/${ setLocation }` }
            >
                Today
            </NavLink>
        </>
    );
};