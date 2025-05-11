import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import s from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <ul className={s.nav_wrapper}>
        <li>
          <Navigation />
        </li>
        <li>{isLoggedIn ? <UserMenu /> : <AuthNav />}</li>
      </ul>
    </nav>
  );
};

export default AppBar;
