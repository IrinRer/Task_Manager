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
import OneMember from './OneMember';

const Info: React.FC = () => {
  const author = useAppSelector(getTaskAuthor);
  const watchers = useAppSelector(getTaskWatchers);
  const responsible = useAppSelector(getTaskResponsible);
  const implementer = useAppSelector(getTaskImplementer);

  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  const responsibleRoleID = useAppSelector(getResponsibleRoleID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  return (
    <>
      <MembersWrapper roleName="Автор">
        <OneMember user={author || null} roleId="" />
      </MembersWrapper>

      <MembersWrapper roleName="Ответственный">
        <OneMember
          editable
          user={responsible || null}
          roleId={responsibleRoleID || ''}
        />
      </MembersWrapper>

      <MembersWrapper roleName="Исполнитель">
        <OneMember
          editable
          user={implementer || null}
          roleId={implementerRoleID || ''}
        />
      </MembersWrapper>

      <MembersWrapper roleName="Наблюдатель">
        <div className={styles.watchers}>
          {watchers?.map((el) => (
            <OneMember editable user={el} roleId={watcherRoleID || ''} />
          ))}
          <AddMemberButtonMulti
            selectedMembers={watchersID}
            roleId={watcherRoleID || ''}
          />
        </div>
      </MembersWrapper>
    </>
  );
};

export default Info;
