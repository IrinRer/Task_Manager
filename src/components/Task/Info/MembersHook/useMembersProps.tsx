import { ROLES } from 'constants/task';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getAuthorRoleID,
  getImplementerRoleID,
  getResponsibleRoleID,
  getWatcherRoleID,
} from 'store/common/roles/selectors';
import {
  getTaskAuthor,
  getTaskImplementers,
  getTaskImplementersID,
  getTaskResponsible,
  getTaskWatchers,
  getTaskWatchersID,
} from 'store/editTask/selectors';
import { IUser } from 'store/users/types';

type TRoleData = {
  name: string;
  roleId: string;
  users: IUser[] | IUser | undefined;
  usersID: string[] | string | undefined;
};

const useMembersProps = (roleName: string) => {
  const watchers = useAppSelector(getTaskWatchers);
  const watchersID = useAppSelector(getTaskWatchersID);
  const watcherRoleID = useAppSelector(getWatcherRoleID);

  const implementers = useAppSelector(getTaskImplementers);
  const implementersID = useAppSelector(getTaskImplementersID);
  const implementerRoleID = useAppSelector(getImplementerRoleID);

  const author = useAppSelector(getTaskAuthor);
  const authorID = author?.user_id;
  const authorRoleID = useAppSelector(getAuthorRoleID);

  const responsible = useAppSelector(getTaskResponsible);
  const responsibleID = responsible?.user_id;
  const responsibleRoleID = useAppSelector(getResponsibleRoleID);

  const RoleData: Array<TRoleData> = [
    {
      name: 'Автор',
      roleId: authorRoleID || '',
      users: author,
      usersID: authorID,
    },
    {
      name: ROLES.watcher,
      roleId: watcherRoleID || '',
      users: watchers,
      usersID: watchersID,
    },
    {
      name: ROLES.implementer,
      roleId: implementerRoleID || '',
      users: implementers,
      usersID: implementersID,
    },
    {
      name: ROLES.responsible,
      roleId: responsibleRoleID || '',
      users: responsible,
      usersID: responsibleID,
    },
  ];

  return RoleData.find((el) => {
    return el.name === roleName;
  });
};

export default useMembersProps;
