import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <ul className={s.navigation_wrapper}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(s.navigation_title, isActive && s.active)
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              clsx(s.navigation_title, isActive && s.active)
            }
          >
            Contacts
          </NavLink>
        )}
      </li>
    </ul>
  );
};

export default Navigation;
