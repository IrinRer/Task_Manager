import AddMemberButton from 'components/Task/Info/AddMemberButton';
import React, { FC } from 'react';
import { IAssignUser } from 'store/members/types';
import EditableMember from '../EditableMember';
import styles from './index.module.scss';

type TProps = {
  user: IAssignUser | null;
  roleId: string;
  editable?: true;
};

const OneMember: FC<TProps> = ({ user, roleId, editable }) => {
  return (
    <div className={styles.members}>
      {editable && user ? <EditableMember user={user} roleId={roleId} /> : null}

      {!editable && user ? (
        <span className={styles.noeditMembers}>{user.name}</span>
      ) : null}

      {!user ? <AddMemberButton roleId={roleId} /> : null}
    </div>
  );
};

export default OneMember;
