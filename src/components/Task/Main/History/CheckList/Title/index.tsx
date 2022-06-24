import { HISTORY_COMMAND } from 'constants/history/common';
import React from 'react';
import DateHistory from '../../DateHistory';
import User from '../../User';

import styles from '../../index.module.scss';

const ChecklistTitle = ({item}) => {
    return (
        <div className={styles.history}>
        <div className={styles.historyElem}>
          <User
            item={item}
            text={HISTORY_COMMAND.сhangeTitleChecklist}
          />
          <DateHistory item={item} />
        </div>
  
        <div className={styles.historyElemItem}>
          <span>Новое название:&nbsp;</span>
          <span>{item.params.title}</span>
        </div>
      </div>
    )
} 

export default ChecklistTitle;