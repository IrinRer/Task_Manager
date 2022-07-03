import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const CommonComponentChildren = ({children}) => {
  return (
    <div className={styles.historyElem}>
      <User />
      {children}
      <DateHistory />
    </div>
  );
};

export default CommonComponentChildren;
