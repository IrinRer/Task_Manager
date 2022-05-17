import React, { FC } from 'react';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import { IUser } from 'store/users/types';
import styles from './index.module.scss';
import OneMember from '../OneMember';

type TProps = {
  users: IUser[] | null;
  roleId: string;
};

const MembersByOne: FC<TProps> = ({ users, roleId }) => {
  return (
    <div className={styles.watchers}>
      {users?.slice(0, 3).map((el) => (
        <OneMember key={el.user_id} editable user={el} roleId={roleId || ''} />
      ))}
      {users?.length <= 3 ? (
        <AddMemberButtonMulti roleId={roleId || ''} />
      ) : null}
    </div>
  );
};

export default MembersByOne;
