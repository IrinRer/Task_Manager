import UserAvatar from 'components/Common/UserAvatar';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React from 'react';
import DateHistory from '../DateHistory';
import styles from '../index.module.scss';
import User from '../User';

const AssignUser = ({ item }) => {
  return (
    <div className={styles.history}>
      <div className={styles.historyElem}>
        <User
          item={item}
          text={
            item.command_code === HISTORY.roleAssign
              ? HISTORY_COMMAND.assignUser
              : HISTORY_COMMAND.unassignUser
          }
        />
        <DateHistory item={item} />
      </div>

      <div className={styles.historyElemItem}>
        <UserAvatar user={item.params.assign_user} />
        <span
          className={styles.spanUser}
        >{`${item.params.assign_user.name}`}</span>
      </div>
    </div>
  );
};

export default AssignUser;
