import UserAvatar from 'components/Common/UserAvatar';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import { useDefineAdaptive } from 'customHooks/useDefineAdaptive';
import React, { FC } from 'react';
import { IHistoryItem } from 'store/history/types';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem;
}

const AssignUser: FC<IProps> = ({ item }) => {
  const condition =
    item.command_code === HISTORY.roleAssign
      ? HISTORY_COMMAND.assignUser
      : HISTORY_COMMAND.unassignUser;

  const component = useDefineAdaptive(
    condition ? (
      <div className={styles.historyElemItem}>
        <UserAvatar user={item.params.assign_user} />
        <span
          className={styles.spanUser}
        >{`${item.params.assign_user.name}`}</span>
      </div>
    ) : null,
  );

  return (
    <ContextWrapperHistory item={item} text={condition}>
      <div className={styles.history}>{component}</div>
    </ContextWrapperHistory>
  );
};

export default AssignUser;
