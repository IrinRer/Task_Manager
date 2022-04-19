import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getImplementerRoleID,
  getResponsibleRoleID,
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
  getTaskWatchersID,
  getWatcherRoleID,
} from 'store/task/selectors';
import styles from './index.module.scss';
import AddMemberButton from '../Info/AddMemberButton';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const watchers = useAppSelector(getTaskWatchers);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);

  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  // const responsibleID = useAppSelector(getTaskResponsibleID);
  const responsibleRoleID = useAppSelector(getResponsibleRoleID);
  // const implementerID = useAppSelector(getTaskImplementerID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Автор </span>{' '}
        <span className={styles.members}>{author ? author.name : ''}</span>
      </div>

      <div className={styles.infoLine}>
        <span>Ответственный</span>
        <span className={styles.members}>
          {responsible ? (
            responsible.name
          ) : (
            <AddMemberButton multi={false} roleId={responsibleRoleID || ''} />
          )}
        </span>
      </div>

      <div className={styles.infoLine}>
        <span>Исполнитель</span>
        <span className={styles.members}>
          {implementer ? (
            implementer.name
          ) : (
            <AddMemberButton multi={false} roleId={implementerRoleID || ''} />
          )}
        </span>
      </div>

      <div className={styles.infoLine}>
        <span>Наблюдатель</span>
        <div className={styles.watchers}>
          {watchers.length !== 0
            ? watchers.map((el) => (
                <span className={styles.members}>{el.name}</span>
              ))
            : ''}
          <AddMemberButton
            multi
            selectedMembers={watchersID}
            roleId={watcherRoleID || ''}
          />
        </div>
      </div>
    </>
  );
};

export default Info;
