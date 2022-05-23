import React, { FC } from 'react';
import AddMemberButton from 'components/Task/Info/AddMemberButton';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import styles from './index.module.scss';
import OneMember from '../OneMember';

type TProps = {
  roleName: string;
  multiAdd: boolean;
  usersMaxCount: number;
  editable: boolean;
};

const MembersByOne: FC<TProps> = ({
  roleName,
  multiAdd,
  usersMaxCount,
  editable,
}) => {
  const usersData = useMembersProps(roleName);
  const users =
    usersData?.users && Array.isArray(usersData?.users) ? usersData?.users : [];

  const addMemberBtn = multiAdd ? (
    <AddMemberButtonMulti roleName={roleName} usersMaxCount={usersMaxCount} />
  ) : (
    <AddMemberButton roleName={roleName} />
  );

  return (
    <div className={styles.watchers}>
      {users?.slice(0, 3).map((el) => (
        <OneMember
          key={el.user_id}
          user={el}
          editable={editable}
          roleName={roleName}
        />
      ))}
      {users?.length < usersMaxCount && editable ? addMemberBtn : null}
    </div>
  );
};

export default MembersByOne;
