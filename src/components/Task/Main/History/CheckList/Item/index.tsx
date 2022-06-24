import React from 'react';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import DateHistory from '../../DateHistory';
import User from '../../User';

import styles from '../../index.module.scss';

const ItemChecklist = ({ item }) => {
  const conditionCreate = item.command_code === HISTORY.itemChecklistCreate;
  const conditionComplete = item.command_code === HISTORY.itemChecklistComplete;

  const className = classNames(styles.checklist, {
    [styles.complete_checklist]: conditionComplete,
  });

  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={`${
            conditionCreate
              ? HISTORY_COMMAND.createItemChecklist
              : conditionComplete
              ? HISTORY_COMMAND.completeItemChecklist
              : HISTORY_COMMAND.deleteItemChecklist
          } ${item.params.check_list.title}`}
        />
        <DateHistory item={item} />
      </div>

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
  );
};

export default ItemChecklist;
