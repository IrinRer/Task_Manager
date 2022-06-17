import React from 'react';
import notifyView from 'assets/icons/notifyView.svg';
import styles from './index.module.scss';

const Icon = () => {
  return (
    <div className={styles.icon}>
      <img className={styles.image} src={notifyView} alt="viewIcon" />
    </div>
  );
};

export default Icon;
