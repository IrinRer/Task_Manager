import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getTaskWatchers,
  getTaskWatchersID,
} from 'store/task/selectors';
import {
  getImplementerRoleID,
  getResponsibleRoleID,
  getWatcherRoleID,
} from 'store/common/roles/selectors';
import styles from './index.module.scss';
import AddMemberButtonMulti from '../Info/AddMemberButtonMulti';
import MembersWrapper from './MembersWrapper';
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
      <MembersWrapper roleName="Автор">
        <span className={styles.members}>{author ? author.name : ''}</span>
      </MembersWrapper>

      <MembersWrapper roleName="Ответственный">
        <span className={styles.members}>
          {responsible ? (
            responsible.name
          ) : (
            <AddMemberButton multi={false} roleId={responsibleRoleID || ''} />
          )}
        </span>
      </MembersWrapper>

      <MembersWrapper roleName="Исполнитель">
        <span className={styles.members}>
          {implementer ? (
            implementer.name
          ) : (
            <AddMemberButton multi={false} roleId={implementerRoleID || ''} />
          )}
        </span>
      </MembersWrapper>

      <MembersWrapper roleName="Наблюдатель">
        <div className={styles.watchers}>
          {watchers.length !== 0
            ? watchers.map((el) => (
                <span className={styles.members}>{el.name}</span>
              ))
            : ''}
          <AddMemberButtonMulti
            multi
            selectedMembers={watchersID}
            roleId={watcherRoleID || ''}
          />
        </div>
      </MembersWrapper>
    </>
  );
};

export default Info;
