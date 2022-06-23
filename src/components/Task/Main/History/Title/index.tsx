import { HISTORY_COMMAND } from 'constants/common';
import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';

import styles from '../index.module.scss';

const Title = ({item}) => {
    return (
        <div className={styles.history}>
        <div className={styles.historyElem}>
          <User
            item={item}
            text={HISTORY_COMMAND.changeTitle}
          />
          <DateHistory item={item} />
        </div>
  
        <div className={styles.historyElemItem}>
          <span>Новый заголовок: </span>
          <span>{item.params.title}</span>
        </div>
      </div>

    )
}

export default Title;