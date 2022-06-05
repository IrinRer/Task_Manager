import UserAvatar from 'components/Common/UserAvatar';
import AddMemberButton from 'components/Task/Info/AddMemberButton';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { EditableContext, RoleContext } from 'constants/common';
import React, { FC, useContext } from 'react';
import { IUser } from 'store/users/types';
import EditableMember from '../EditableMember';
import MemberItem from '../MemberItem';
import styles from './index.module.scss';

type TProps = {
  user?: IUser;
};

const OneMember: FC<TProps> = ({ user }) => {
  const roleName = useContext(RoleContext);
  const editable = useContext(EditableContext);
  const usersData = useMembersProps(roleName);
  const userFromTaskRole = usersData?.users ? usersData?.users[0] : undefined;

  const member = user || userFromTaskRole;

  return (
    <div className={styles.members}>
      {editable && member ? <EditableMember user={member} /> : null}

      {!editable && member ? <MemberItem user={member} /> : null}

      {!member && editable ? <AddMemberButton /> : null}
    </div>
  );
};

export default OneMember;
