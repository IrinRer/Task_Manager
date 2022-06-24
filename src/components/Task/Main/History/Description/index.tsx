import { HISTORY_COMMAND } from 'constants/history/common';
import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';

import styles from '../index.module.scss';

const Description = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User item={item} text={HISTORY_COMMAND.changeDescription} />
        <DateHistory item={item} />
      </div>
    </div>
  );
};

export default Description;
