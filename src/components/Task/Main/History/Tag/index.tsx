import React from 'react';
import CustomTag from 'components/Common/CustomTag';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const TagHistory = ({ item }) => {
  const condition = item.command_code === HISTORY.tagAssign;

  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={
            condition ? HISTORY_COMMAND.addTag : HISTORY_COMMAND.unassignTag
          }
        />
        <DateHistory item={item} />
      </div>
      {condition && (
        <div className={styles.historyElemItem}>
          <CustomTag
            title={item.params.tag.name}
            color={item.params.tag.color}
            closable={false}
          />
        </div>
      )}
    </div>
  );
};

export default TagHistory;
