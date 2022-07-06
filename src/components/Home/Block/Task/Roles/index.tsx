import { Avatar, Popover } from 'antd';
import { TaskContext } from 'components/Home/taskContext';
import React, { useContext } from 'react';
import AllUsersInTask from '../../Roles/AllUsersInTask';
import AvatarWrapper from '../AvatarWrapper';
import styles from './index.module.scss';

const Roles: React.FC = () => {
  const task = useContext(TaskContext);

  const roles = task?.roles;

  if (!roles?.length) return null;

  // рендерим только первые две роли по ТЗ
  const renderedRoles = roles.slice(0, 2);

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
        <Popover content={<AllUsersInTask />} trigger="hover">
          <Avatar className={styles.plus}>+ {roles.length - 2}</Avatar>
        </Popover>
      )}
    </div>
  );
};

export default Roles;
