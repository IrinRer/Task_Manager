import { HISTORY_COMMAND } from 'constants/common';
import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const Status = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User item={item} text={HISTORY_COMMAND.changeStatus} />
        <DateHistory item={item} />
      </div>
     
      <div className={styles.historyElemStatus}>
        <span>Новый статус:&nbsp;</span>
        <span className={styles.spanStatus}> {item.params.status.name}</span>
      </div>
    </div>
  );
};

export default Status;
