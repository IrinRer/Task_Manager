import React from 'react';

import logo from 'assets/logo.svg';
import Tasks from './Tasks';

import styles from './index.module.scss';

interface IProps {
  token: string;
}
const Hello: React.FC<IProps> = ({ token }) => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>Стажировка по фронтенду (группа 3) &#128293;</p>
      {/* Props drilling - плохо */}
      <Tasks token={token} />
    </div>
  );
};

export default Hello;
