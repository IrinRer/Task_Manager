import React, { FC } from 'react';
import {
  HISTORY,
  HISTORY_COMMAND,
  PRIORITY_CHANGE,
} from 'constants/history/common';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import { IHistoryItem } from 'store/history/types';
import { STYLES } from 'constants/common';
import { PriorityName } from 'constants/types/common';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
  width: number;
}

const Priority: FC<IProps> = ({ item, width }) => {
  const condition = HISTORY.priorityChange
    ? HISTORY_COMMAND.changePriority
    : PRIORITY_CHANGE;
  const component = useDefineAdaptive(width,
    item.params.priority ? (
      <div className={styles.historyElemStatus}>
        <span>Новый приоритет:&nbsp;&nbsp;</span>
        <div className={styles.wrapper_priority}>
          <div
            className={styles[STYLES[PriorityName[item.params.priority.name]]]}
          />
          <span>{item.params.priority.name}</span>
        </div>
      </div>
    ) : null,
  );

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default Priority;
