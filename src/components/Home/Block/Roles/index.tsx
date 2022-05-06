import { Avatar } from 'antd';
import { TRole } from 'constants/types/common';
import React from 'react';
import AvatarWrapper from '../AvatarWrapper';
import styles from './index.module.scss';

interface IProps {
  roles: TRole[];
}

const Roles: React.FC<IProps> = ({ roles }) => {
  const renderRoles = (roles: TRole[]): React.ReactElement => {
    const renderedRoles = roles.length > 2 ? roles.slice(0, 2) : [...roles];
    return (
      <>
        {renderedRoles.map((role) => {
          return <AvatarWrapper key={role.task_to_role_id} role={role} />;
        })}
        {roles.length > 2 && (
          <Avatar className={styles.plus}>+ {roles.length - 2}</Avatar>
        )}
      </>
    );
  };

  return (
    <div className={styles.wrapper}>{roles.length && renderRoles(roles)}</div>
  );
};

export default Roles;
