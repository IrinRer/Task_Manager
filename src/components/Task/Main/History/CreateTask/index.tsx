import { HISTORY_COMMAND } from 'constants/common';
import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';

import styles from '../index.module.scss';

const CreateTask = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User item={item} text={HISTORY_COMMAND.createTask} />
        <DateHistory item={item} />
      </div>
    </div>
  );
};

export default CreateTask;
