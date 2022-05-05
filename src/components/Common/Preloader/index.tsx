import React from 'react';
import Spinner from 'components/Common/Spinner';
import style from './index.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={style.preloader}>
      <Spinner className={style.spinner} />
    </div>
  );
};

export default Preloader;
