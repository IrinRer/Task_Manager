import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React from 'react';
import DateHistory from '../../DateHistory';
import User from '../../User';

import styles from '../../index.module.scss';

const ChecklistAssign = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={
            item.command_code === HISTORY.checklistAssign
              ? HISTORY_COMMAND.assignChecklist
              : HISTORY_COMMAND.unassignChecklist
          }
        />
        <DateHistory item={item} />
      </div>
    </div>
  );
};

export default ChecklistAssign;
