import { Avatar, Popover } from 'antd';
import { TaskContext } from 'constants/taskContext';
import React, { useContext } from 'react';
import AvatarWrapper from '../AvatarWrapper';
import AllUsersInTask from './AllUsersInTask';
import styles from './index.module.scss';

const Roles: React.FC = () => {
  const task = useContext(TaskContext);

  const roles = task?.roles;

  if (!roles || roles.length === 0) return null;

  // рендерим только первые три роли по ТЗ
  const renderedRoles = roles.length > 2 ? roles.slice(0, 2) : [...roles];

  return (
    <div className={styles.wrapper}>
      {renderedRoles.map((role) => {
        return (
          <Popover
            key={role.task_to_role_id}
            content={role.assign_user.name}
            trigger="hover"
          >
            <button type="button">
              <AvatarWrapper role={role} />
            </button>
          </Popover>
        );
      })}
      {roles.length > 2 && (
        <Popover content={<AllUsersInTask roles={roles} />} trigger="hover">
          <Avatar className={styles.plus}>+ {roles.length - 2}</Avatar>
        </Popover>
      )}
    </div>
  );
};

export default Roles;
