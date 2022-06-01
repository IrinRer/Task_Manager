import AvatarWrapper from 'components/Home/Block/AvatarWrapper';
import AddMemberButton from 'components/Task/Info/AddMemberButton';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import React, { FC } from 'react';
import { IUser } from 'store/users/types';
import EditableMember from '../EditableMember';
import styles from './index.module.scss';

type TProps = {
  user?: IUser;
  roleName: string;
  editable: boolean;
};

const OneMember: FC<TProps> = ({ user, roleName, editable }) => {
  const usersData = useMembersProps(roleName);
  const userFromTaskRole = usersData?.users ? usersData?.users[0] : undefined;

  const member = user || userFromTaskRole;

  return (
    <div className={styles.members}>
      {editable && member ? (
        <EditableMember user={member} roleName={roleName} />
      ) : null}

      {!editable && member ? (
        <div className={styles.wrapper}>
          <div className={styles.avatarWrapper}>
            <AvatarWrapper role={member} />
          </div>
          <span className={styles.noeditMembers}>{member.name}</span>
        </div>
      ) : null}

      {!member && editable ? <AddMemberButton roleName={roleName} /> : null}
    </div>
  );
};

export default OneMember;
