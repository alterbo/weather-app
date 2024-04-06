import { NavLink, useParams } from 'react-router-dom'
import styles from './Navbar.module.css';

export const Navbar = () => {
    const { locationId } = useParams();
    const setLocation = locationId && locationId.length > 1 ? locationId :  'center';
    return (
        <>
            <NavLink
                className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink }
                to={ `/${ setLocation }` }
            >
                Location
            </NavLink>
            <NavLink
                className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink }
                to={ `/week/${ setLocation }` }
            >
                Week
            </NavLink>
            <NavLink
                className={({ isActive }) => isActive ? `${styles.navlink} ${styles.active}` : styles.navlink }
                to={ `/today/${ setLocation }` }
            >
                Today
            </NavLink>
        </>
    );
};