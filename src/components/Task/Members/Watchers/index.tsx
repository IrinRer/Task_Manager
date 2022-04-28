import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskWatchers, getTaskWatchersID } from 'store/task/selectors';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import AddMemberButtonMulti from 'components/Task/Info/AddMemberButtonMulti';
import styles from './index.module.scss';
import OneMember from '../OneMember';

const Watchers: React.FC = () => {
  const watchers = useAppSelector(getTaskWatchers);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);

  return (
    <div className={styles.watchers}>
      {watchers?.map((el) => (
        <OneMember
          key={el.user_id}
          editable
          user={el}
          roleId={watcherRoleID || null}
        />
      ))}
      <AddMemberButtonMulti
        selectedMembers={watchersID}
        roleId={watcherRoleID || null}
      />
    </div>
  );
};

export default Watchers;
