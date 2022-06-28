import React, { FC } from 'react';
import {
  HISTORY,
  HISTORY_COMMAND,
  PRIORITY_CHANGE,
} from 'constants/history/common';
import { IHistoryItem } from 'store/history/types';
import { STYLES } from 'constants/common';
import { PriorityName } from 'constants/types/common';
import ContextWrapperHistory from '../ContextWrapper';
import CommonComponent from '../Common';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const Priority: FC<IProps> = ({ item }) => {
  const condition = HISTORY.priorityChange;

  return (
    <ContextWrapperHistory
      item={item}
      text={condition ? HISTORY_COMMAND.changePriority : PRIORITY_CHANGE}
    >
      <div className={styles.history}>
        <CommonComponent />

        {item.params.priority && (
          <div className={styles.historyElemStatus}>
            <span>Новый приоритет:&nbsp;&nbsp;</span>
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
      </div>
    </ContextWrapperHistory>
  );
};

export default Priority;
