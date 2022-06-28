import UserAvatar from 'components/Common/UserAvatar';
import { HISTORY, HISTORY_COMMAND } from 'constants/history/common';
import React, {FC} from 'react';
import { IHistoryItem } from 'store/history/types';
import CommonComponent from '../Common';
import ContextWrapperHistory from '../ContextWrapper';
import styles from '../index.module.scss';

interface IProps {
  item: IHistoryItem
}

const AssignUser: FC<IProps> = ({ item }) => {
  return (
    <ContextWrapperHistory item={item} text={
      item.command_code === HISTORY.roleAssign
        ? HISTORY_COMMAND.assignUser
        : HISTORY_COMMAND.unassignUser
    }>
    <div className={styles.history}>
      <CommonComponent/>
      <div className={styles.historyElemItem}>
        <UserAvatar user={item.params.assign_user} />
        <span
          className={styles.spanUser}
        >{`${item.params.assign_user.name}`}</span>
      </div>
    </div>
   </ContextWrapperHistory>
  );
};

export default AssignUser;
