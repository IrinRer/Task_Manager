import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../../ContextWrapper';
import styles from '../../index.module.scss';
import CommonComponentNoChildren from '../../Common/CommonComponent';

interface IProps {
  item: IHistoryItem;
  width: number;
}

const ChecklistAssign: FC<IProps> = ({ item, width }) => {
  const condition =
    item.command_code === HISTORY.checklistAssign
      ? HISTORY_COMMAND.assignChecklist
      : HISTORY_COMMAND.unassignChecklist;

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>
        <CommonComponentNoChildren />
      </div>
    </ContextWrapperHistory>
  );
};

export default ChecklistAssign;
