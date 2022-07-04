import UserAvatar from 'components/Common/UserAvatar';
import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { NOTIFY_MESSAGE } from 'constants/notify';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useContext } from 'react';
import { getUserById } from 'store/users/selectors';
import styles from './index.module.scss';

const TaskRoleChange = () => {
  const notification = useContext(NotifierContext);

  const userId =
    notification?.history_command.params.assign_user?.user_id || '';

  const user = useAppSelector((state) => getUserById(state, userId));

  if (!notification) return null;

  return (
    <>
      <div>{NOTIFY_MESSAGE[notification.history_command.command_name]}</div>
      <div className={styles.avatar}>
        <UserAvatar user={user} />
      </div>
    </>
  );
};

export default TaskRoleChange;
