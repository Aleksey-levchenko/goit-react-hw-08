import { useState } from 'react';
import { RiseLoader } from 'react-spinners';
import s from './Loader.module.css';

const Loader = () => {
  const [loaderColor, setLoaderColor] = useState('#4fc3f7');

  return <RiseLoader color={loaderColor} className={s.loader_wrapper} />;
};

export default Loader;
