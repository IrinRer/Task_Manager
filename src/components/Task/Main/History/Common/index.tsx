import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const CommonComponent = () => {
  return (
    <div className={styles.historyElem}>
      <User />
      <DateHistory />
    </div>
  );
};

export default CommonComponent;
