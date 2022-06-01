import { ROLES } from 'constants/types/common';
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
  users?: Array<IUser>;
  usersID?: Array<string>;
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

  const objToArray = <T,>(obj: T | T[] | undefined): T[] | undefined => {
    if (obj === undefined) return undefined;
    return Array.isArray(obj) ? obj : [obj];
  };

  const ROLE_DATA: Array<TRoleData> = [
    {
      name: ROLES.author,
      roleId: authorRoleID || '',
      users: objToArray(author),
      usersID: objToArray(authorID),
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
      users: objToArray(responsible),
      usersID: objToArray(responsibleID),
    },
  ];

  return ROLE_DATA.find((el) => {
    return el.name === roleName;
  });
};

export default useMembersProps;
