import React, { FC } from 'react';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import { IHistoryItem } from 'store/history/types';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import ContextWrapperHistory from '../../ContextWrapper';
import CommonComponent from '../../Common';
import styles from '../../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const ItemChecklist: FC<IProps> = ({ item }) => {
  const conditionCreate = item.command_code === HISTORY.itemChecklistCreate;
  const conditionComplete = item.command_code === HISTORY.itemChecklistComplete;

  const className = classNames(styles.checklist, {
    [styles.complete_checklist]: conditionComplete,
  });

  return (
    <ContextWrapperHistory
      item={item}
      text={`${
        conditionCreate
          ? HISTORY_COMMAND.createItemChecklist
          : conditionComplete
          ? HISTORY_COMMAND.completeItemChecklist
          : HISTORY_COMMAND.deleteItemChecklist
      } ${item.params.check_list.title}`}
    >
      <div className={styles.history}>
        <CommonComponent />

        {(conditionCreate || conditionComplete) && (
          <div className={styles.historyElemItem}>
            <Checkbox
              disabled
              defaultChecked={conditionComplete}
              className={className}
            >
              {item.params?.message || item.params.check_list_item?.message}
            </Checkbox>
          </div>
        )}
      </div>
    </ContextWrapperHistory>
  );
};

export default ItemChecklist;
