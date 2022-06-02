import React from 'react';
import { TRole } from 'constants/types/common';
import style from './index.module.scss';

interface IPropsRoles {
  roles: TRole[];
}

const AllUsersInTask: React.FC<IPropsRoles> = ({ roles }) => {
  return (
    <ul className={style.wrapper}>
      {roles.map((role: TRole) => {
        return <li key={role.task_to_role_id}>{role.assign_user.name}</li>;
      })}
    </ul>
  );
};

export default AllUsersInTask;
