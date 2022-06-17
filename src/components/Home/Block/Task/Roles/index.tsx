import { Avatar } from 'antd';
import React, { useContext } from 'react';
import { TaskContext } from 'components/Home/taskContext';
import AvatarWrapper from '../AvatarWrapper';
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
        return <AvatarWrapper key={role.task_to_role_id} role={role} />;
      })}
      {roles.length > 2 && (
        <Avatar className={styles.plus}>+ {roles.length - 2}</Avatar>
      )}
    </div>
  );
};

export default Roles;
