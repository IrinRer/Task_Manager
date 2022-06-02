import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC, useContext } from 'react';
import { deleteTaskMemberAction } from 'store/editTask/thunk';
import { getTaskId } from 'store/editTask/selectors';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { IUser } from 'store/users/types';
import { ROLES } from 'constants/types/common';
import { RoleContext } from 'constants/common';
import UserAvatar from 'components/Common/UserAvatar';
import styles from './index.module.scss';

type TProps = {
  user: IUser;
};

const EditableMember: FC<TProps> = ({ user }) => {
  const roleName = useContext(RoleContext);
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const usersData = useMembersProps(roleName);
  const roleId = usersData?.roleId;
  const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

  const deleteMember = () => {
    if (taskId && user && roleId) {
      dispatch(
        deleteTaskMemberAction({
          task_id: taskId,
          assign_user_id: user.user_id,
          task_role_id: roleId,
        }),
      );
      if (roleName !== ROLES.watcher && watcherRoleId) {
        dispatch(
          deleteTaskMemberAction({
            task_id: taskId,
            assign_user_id: user.user_id,
            task_role_id: watcherRoleId,
          }),
        );
      }
    }
  };
  return (
    <div className={styles.editMembers}>
      <div className={styles.avatarWrapper}>
        <UserAvatar user={user} />
      </div>
      <span>{user?.name}</span>
      <CloseOutlined className={styles.delete} onClick={deleteMember} />
    </div>
  );
};

export default EditableMember;
