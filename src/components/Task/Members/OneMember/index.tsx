import classnames from 'classnames';
import { RightsRoleContext } from 'components/Task/context';
import AddMemberButton from 'components/Task/Info/AddMemberButton';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import React, { FC, useContext } from 'react';
import { IUser } from 'store/users/types';
import EditableMember from '../EditableMember';
import MemberItem from '../MemberItem';
import styles from './index.module.scss';

type TProps = {
  user?: IUser;
};

const OneMember: FC<TProps> = ({ user }) => {
  const roleName = useContext(RightsRoleContext).role;
  const editable = useContext(RightsRoleContext).isRights;
  const usersData = useMembersProps(roleName);
  const userFromTaskRole = usersData?.users ? usersData?.users[0] : undefined;

  const member = user || userFromTaskRole;

  return (
    <div
      className={classnames(
        user ? styles.inlist : styles.nolist,
        !editable ? styles.noedit : '',
      )}
    >
      {editable && member ? <EditableMember user={member} /> : null}

      {!editable && member ? <MemberItem obj={member} /> : null}

      {!member && editable ? <AddMemberButton /> : null}
    </div>
  );
};

export default OneMember;
