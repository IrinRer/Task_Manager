import React, { useContext } from 'react';
import { TRole } from 'constants/types/common';
import { TaskContext } from 'constants/taskContext';
import style from './index.module.scss';

const AllUsersInTask: React.FC = () => {
  const task = useContext(TaskContext);
  const roles = task?.roles;

  return (
    <ul className={style.wrapper}>
      {roles!.map((role: TRole) => {
        return <li key={role.task_to_role_id}>{role.assign_user.name}</li>;
      })}
    </ul>
  );
};

export default AllUsersInTask;
