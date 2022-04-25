import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { FC } from 'react';
import { deleteTaskMemberAction } from 'store/task/thunk';
import { IAssignUser } from 'store/members/types';
import { getTaskId } from 'store/task/selectors';
import styles from './index.module.scss';

type TProps = {
  user: IAssignUser;
  roleId: string;
};

const EditableMember: FC<TProps> = ({ user, roleId }) => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getTaskId);

  const deleteMember = () => {
    dispatch(
      deleteTaskMemberAction({
        task_id: taskId,
        assign_user_id: user.user_id,
        task_role_id: roleId,
      }),
    );
  };
  return (
    <div className={styles.editMembers}>
      <span>{user.name}</span>
      <CloseOutlined className={styles.delete} onClick={deleteMember} />
    </div>
  );
};

export default EditableMember;
