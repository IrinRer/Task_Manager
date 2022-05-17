import AddMemberButton from 'components/Task/Info/AddMemberButton';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import React, { FC } from 'react';
import { IUser } from 'store/users/types';
import EditableMember from '../EditableMember';
import styles from './index.module.scss';

type TProps = {
  user?: IUser;
  roleName: string;
  editable?: true;
};

const OneMember: FC<TProps> = ({ user, roleName, editable }) => {
  const usersData = useMembersProps(roleName);
  const userFromTaskRole =
    usersData?.users && !Array.isArray(usersData?.users)
      ? usersData?.users
      : undefined;

  const member = user || userFromTaskRole;

  return (
    <div className={styles.members}>
      {editable && member ? (
        <EditableMember user={member} roleName={roleName} />
      ) : null}

      {!editable && member ? (
        <span className={styles.noeditMembers}>{member.name}</span>
      ) : null}

      {!member ? <AddMemberButton roleName={roleName} /> : null}
    </div>
  );
};

export default OneMember;
