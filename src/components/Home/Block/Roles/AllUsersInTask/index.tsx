import React, { useContext } from 'react';
import { TaskContext } from 'components/Home/taskContext';
import { ITaskRoles } from 'store/common/task/types';
import style from './index.module.scss';

const AllUsersInTask: React.FC = () => {
  const task = useContext(TaskContext);
  const roles = task?.roles;

  return (
    <ul className={style.wrapper}>
      {roles!.map((role: ITaskRoles) => {
        return <li key={role.task_to_role_id}>{role.assign_user.name}</li>;
      })}
    </ul>
  );
};

export default AllUsersInTask;
