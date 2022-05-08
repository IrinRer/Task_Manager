import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskWatchers ,
    getTaskWatchersID
  } from 'store/editTask/selectors';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import ListMember from 'components/Task/Info/ListMember';
import styles from './index.module.scss';
import OneMember from '../OneMember';

const Watchers: React.FC = () => {
  const watchers = useAppSelector(getTaskWatchers);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  const isManyUsers = watchers.length > 3;

  return (
    <div className={styles.watchers}>
      {isManyUsers ? (
      <ListMember users={watchers} usersID={watchersID} roleId={watcherRoleID || ''}/>
      ) : 
      (watchers?.map((el) => (
        <OneMember
          key={el.user_id}
          editable
          user={el}
          roleId={watcherRoleID || ''}
        />
      ))
      )}
      {watchers.length <= 50 ? (
        <AddMemberButtonMulti roleId={watcherRoleID || ''} />
      ) : null}
    </div>
  );
};

export default Watchers;
