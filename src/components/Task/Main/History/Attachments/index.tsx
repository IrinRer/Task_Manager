import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React from 'react';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const Attachments = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={
            item.command_code === HISTORY.fileAssign
              ? HISTORY_COMMAND.assignFile
              : HISTORY_COMMAND.unassignFile
          }
        />
        <DateHistory item={item} />
      </div>

      {HISTORY_COMMAND.assignFile ? <div>картинка</div> : null}
      {/* <div className={styles.historyElemItem}>
            
          </div> */}
    </div>
  );
};

export default Attachments;
