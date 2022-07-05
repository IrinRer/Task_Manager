import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
  width: number;
}

const Status: FC<IProps> = ({ item, width }) => {
  const component = useDefineAdaptive(width,
    <div className={styles.historyElemStatus}>
      <span>Новый статус:&nbsp;&nbsp;</span>
      <span className={styles.spanStatus}> {item.params.status.name}</span>
    </div>,
  );
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeStatus}>
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default Status;
