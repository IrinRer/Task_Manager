import UserAvatar from 'components/Common/UserAvatar';
import { NotificationMessageToShow } from 'constants/notify';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React from 'react';
import { getUserById } from 'store/users/selectors';
import styles from './index.module.scss';

interface IProps {
  userId: string;
}

const TaskRoleAssign: React.FC<IProps> = ({ userId }) => {
  const user = useAppSelector((state) => getUserById(state, userId));

  return (
    <>
      <div>{NotificationMessageToShow.taskRoleAssign}</div>
      <div className={styles.avatar}>
        <UserAvatar user={user} />
      </div>
    </>
  );
};

export default TaskRoleAssign;
