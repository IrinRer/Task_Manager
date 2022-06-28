import { HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../../ContextWrapper';
import CommonComponent from '../../Common';
import styles from '../../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const ChecklistTitle: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory
      item={item}
      text={HISTORY_COMMAND.сhangeTitleChecklist}
    >
      <div className={styles.history}>
        <CommonComponent />

        <div className={styles.historyElemItem}>
          <span>Новое название:&nbsp;&nbsp;</span>
          <span className={styles.font_weight}>{item.params.title}</span>
        </div>
      </div>
    </ContextWrapperHistory>
  );
};

export default ChecklistTitle;
