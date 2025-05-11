import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={s.authNav_wrapper}>
      <NavLink to="/register" className={s.btn}>
        Registration
      </NavLink>
      <NavLink to="/login" className={s.btn}>
        Sign In
      </NavLink>
    </div>
  );
};

export default AuthNav;
