import React from 'react';
import CustomTag from 'components/Common/CustomTag';
import { HISTORY_COMMAND } from 'constants/common';
import DateHistory from '../DateHistory';
import User from '../User';
import styles from '../index.module.scss';

const TagHistory = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User item={item} text={HISTORY_COMMAND.addTag} />
        <DateHistory item={item} />
      </div>
      <div className={styles.historyElemItem}>
        <CustomTag
          title={item.params.tag.name}
          color={item.params.tag.color}
          closable={false}
        />
      </div>
    </div>
  );
};

export default TagHistory;
