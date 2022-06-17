import classnames from 'classnames';
import UserAvatar from 'components/Common/UserAvatar';
import { RightsRoleContext } from 'components/Task/context';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { AVATAR_SIZE, IUserAvatar } from 'constants/types/common';
import React, { FC, useContext } from 'react';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';

const MemberItem: FC<IUserAvatar<IUser>> = ({
  obj = null,
  size = AVATAR_SIZE.medium,
}) => {
  const roleName = useContext(RightsRoleContext).role;
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
