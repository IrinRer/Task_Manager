import React, { FC } from 'react';
import {
  HISTORY_COMMAND,
  PRIORITY_CHANGE,
} from 'constants/history/common';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import { IHistoryItem } from 'store/history/types';

import UserAvatar from 'components/Common/UserAvatar';
import { STYLES } from 'constants/common';
import { PriorityName } from 'constants/types/common';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const Priority: FC<IProps> = ({ item }) => {
  const condition = item.params.priority
    ? PRIORITY_CHANGE
    : HISTORY_COMMAND.changePriority;

  const component = useDefineAdaptive(
    item.params.priority && condition === PRIORITY_CHANGE ? (
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
      <div className={styles.history}>
        <UserAvatar user={item.user} />
        {component}
      </div>
    </ContextWrapperHistory>
  );
};

export default Priority;
