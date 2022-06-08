import AddMemberButton from 'components/Task/Info/AddMemberButton';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { EditableContext, RoleContext } from 'constants/taskContext';
import React, { FC } from 'react';
import { IUser } from 'store/users/types';
import EditableMember from '../EditableMember';
import MemberItem from '../MemberItem';
import styles from './index.module.scss';

type TProps = {
  user?: IUser;
};

const OneMember: FC<TProps> = ({ user }) => {
  const roleName = RoleContext();
  const editable = EditableContext();
  const usersData = useMembersProps(roleName);
  const userFromTaskRole = usersData?.users ? usersData?.users[0] : undefined;

  const member = user || userFromTaskRole;

  return (
    <div className={user ? styles.inlist : styles.nolist}>
      {editable && member ? <EditableMember user={member} /> : null}

      {!editable && member ? <MemberItem user={member} /> : null}

      {!member && editable ? <AddMemberButton /> : null}
    </div>
  );
};

export default OneMember;
