import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskWatchers } from 'store/editTask/selectors';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import styles from './index.module.scss';
import OneMember from '../OneMember';

const Watchers: React.FC = () => {
  const watchers = useAppSelector(getTaskWatchers);
  const watcherRoleID = useAppSelector(getWatcherRoleID);

  return (
    <div className={styles.watchers}>
      {watchers?.map((el) => (
        <OneMember
          key={el.user_id}
          editable
          user={el}
          roleId={watcherRoleID || ''}
        />
      ))}
      <AddMemberButtonMulti roleId={watcherRoleID || ''} />
    </div>
  );
};

export default Watchers;
