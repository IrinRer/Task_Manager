import classnames from 'classnames';
import UserAvatar from 'components/Common/UserAvatar';
import { RightsRoleContext } from 'components/Task/context';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import React, { FC, useContext } from 'react';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';

type TProps = {
  obj?: IUser;
  size?: 'L' | 'M';
};

const MemberItem: FC<TProps> = ({ obj, size = 'M' }) => {
  const roleName = useContext(RightsRoleContext)?.role || '';
  const usersData = useMembersProps(roleName);
  const userFromTaskRole = usersData?.users ? usersData?.users[0] : undefined;

  const member = obj || userFromTaskRole;

  return (
    <div className={classnames(styles[`avatar${size}`], styles.memberItem)}>
      <div className={styles.avatarWrapper}>
        <UserAvatar user={member} />
      </div>
      <span className={styles.noeditMembers}>{member?.name}</span>
    </div>
  );
};

export default MemberItem;
