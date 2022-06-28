import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../ContextWrapper';
import CommonComponent from '../Common';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const Status: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory item={item} text={HISTORY_COMMAND.changeStatus}>
      <div className={styles.history}>
        <CommonComponent />
        <div className={styles.historyElemStatus}>
          <span>Новый статус:&nbsp;&nbsp;</span>
          <span className={styles.spanStatus}> {item.params.status.name}</span>
        </div>
      </div>
    </ContextWrapperHistory>
  );
};

export default Status;
