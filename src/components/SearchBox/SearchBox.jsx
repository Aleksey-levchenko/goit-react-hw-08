import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css';
import { changeFilterName, changeFilterPhone } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChangeName = e => {
    dispatch(changeFilterName(e.target.value));
  };

  const handleChangePhone = e => {
    dispatch(changeFilterPhone(e.target.value));
  };

  return (
    <ul className={s.search_wrapper}>
      <li className={s.search_item}>
        <label htmlFor="searchByName">Find contact by Name:</label>
        <input
          type="text"
          id="searchByName"
          onChange={handleChangeName}
          className={s.search_input}
          placeholder="Enter Name"
        />
      </li>

      <li className={s.search_item}>
        <label htmlFor="searchByPhone">Find contact by Number:</label>
        <input
          type="text"
          id="searchByPhone"
          onChange={handleChangePhone}
          className={s.search_input}
          placeholder="Enter Number"
        />
      </li>
    </ul>
  );
};

export default SearchBox;
