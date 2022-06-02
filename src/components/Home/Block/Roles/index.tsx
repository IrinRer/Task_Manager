import { Avatar, Popover } from 'antd';
import { TRole } from 'constants/types/common';
import React from 'react';
import AvatarWrapper from '../AvatarWrapper';
import AllUsersInTask from './AllUsersInTask';
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
      </>
    );
  };

  return (
    <div className={styles.wrapper}>{roles.length && renderRoles(roles)}</div>
  );
};

export default Roles;
