import React from 'react';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import { STYLES } from 'constants/common';
import { PriorityName } from 'constants/types/common';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const Priority = ({ item }) => {
  const condition = HISTORY.priorityChange;

  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={
            condition
              ? HISTORY_COMMAND.changePriority
              : 'изменил(а) приоритет задачи'
          }
        />
        <DateHistory item={item} />
      </div>

      {item.params.priority && (
        <div className={styles.historyElemStatus}>
          <span>Новый приоритет:&nbsp;</span>
          <div className={styles.wrapper_priority}>
            <div
              className={
                styles[STYLES[PriorityName[item.params.priority.name]]]
              }
            />
            <span>{item.params.priority.name}</span>
          </div>
        </div>
      )}

      {/* <div className={styles.historyElemStatus}>
            <span>Новый статус:&nbsp;</span>
            <span className={styles.spanStatus}> {item.params.status.name}</span>
          </div> */}
    </div>
  );
};

export default Priority;
