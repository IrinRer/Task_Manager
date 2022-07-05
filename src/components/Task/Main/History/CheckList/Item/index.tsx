import React, { FC } from 'react';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import { IHistoryItem } from 'store/history/types';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import ContextWrapperHistory from '../../ContextWrapper';
import styles from '../../index.module.scss';

interface IProps {
  item: IHistoryItem;
  width: number;
}

const ItemChecklist: FC<IProps> = ({ item, width }) => {
  const conditionCreate = item.command_code === HISTORY.itemChecklistCreate;
  const conditionComplete = item.command_code === HISTORY.itemChecklistComplete;
  const conditionText = conditionCreate
    ? HISTORY_COMMAND.createItemChecklist
    : conditionComplete
    ? HISTORY_COMMAND.completeItemChecklist
    : HISTORY_COMMAND.deleteItemChecklist;

  const className = classNames(styles.checklist, {
    [styles.complete_checklist]: conditionComplete,
  });

  const component = useDefineAdaptive(width, 
    conditionCreate || conditionComplete ? (
      <div className={styles.historyElemChecklist}>
        <Checkbox
          disabled
          defaultChecked={conditionComplete}
          className={className}
        >
          {item.params?.message || item.params.check_list_item?.message}
        </Checkbox>
      </div>
    ) : null,
  );

  return (
    <ContextWrapperHistory
      item={item}
      text={`${conditionText} ${item.params.check_list.title}`}
    >
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default ItemChecklist;
