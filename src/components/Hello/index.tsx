import React from 'react';
import logo from 'assets/logo.svg';
import Tasks from './Tasks';
import styles from './index.module.scss';

const Hello: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>Стажировка по фронтенду (группа 3) &#128293;</p>
      <Tasks />
    </div>
  );
};

export default Hello;
