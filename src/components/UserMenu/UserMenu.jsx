import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import s from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  return (
    <div className={s.user_wrapper}>
      <p className={s.user_title}>Welcome, {name}</p>
      <button
        type="button"
        onClick={() => dispatch(logout())}
        className={s.btn}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
