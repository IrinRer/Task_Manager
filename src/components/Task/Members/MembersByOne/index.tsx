import React, { FC, useContext } from 'react';
import AddMemberButton from 'components/Task/Info/AddMemberButton';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { USERS_BY_ONE_MAX_COUNT } from 'constants/common';
import { RightsRoleContext } from 'components/Task/context';
import styles from './index.module.scss';
import OneMember from '../OneMember';

type TProps = {
  multiAdd: boolean;
  usersMaxCount: number;
};

const MembersByOne: FC<TProps> = ({ multiAdd, usersMaxCount }) => {
  const roleName = useContext(RightsRoleContext).role;
  const editable = useContext(RightsRoleContext).isRights;
  const usersData = useMembersProps(roleName);
  const users = usersData?.users ? usersData?.users : [];

  const addMemberBtn = multiAdd ? (
    <AddMemberButtonMulti usersMaxCount={usersMaxCount} />
  ) : (
    <AddMemberButton />
  );

  return (
    <div className={styles.watchers}>
      {users?.slice(0, USERS_BY_ONE_MAX_COUNT).map((el) => (
        <OneMember key={el.user_id} user={el} />
      ))}
      {users?.length < usersMaxCount && editable ? addMemberBtn : null}
    </div>
  );
};

export default MembersByOne;
