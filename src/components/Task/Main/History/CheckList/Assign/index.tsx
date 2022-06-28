import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../../ContextWrapper';
import CommonComponent from '../../Common';
import styles from '../../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const ChecklistAssign: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory
      item={item}
      text={
        item.command_code === HISTORY.checklistAssign
          ? HISTORY_COMMAND.assignChecklist
          : HISTORY_COMMAND.unassignChecklist
      }
    >
      <div className={styles.history}>
        <CommonComponent />
      </div>
    </ContextWrapperHistory>
  );
};

export default ChecklistAssign;
