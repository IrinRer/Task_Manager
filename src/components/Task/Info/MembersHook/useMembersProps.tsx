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

  const userToArray = (
    user: Array<IUser> | IUser | undefined,
  ): Array<IUser> | undefined => {
    if (user === undefined) return undefined;
    return Array.isArray(user) ? user : [user];
  };

  const userIDToArray = (
    userID: Array<string> | string | undefined,
  ): Array<string> | undefined => {
    if (userID === undefined) return undefined;
    return Array.isArray(userID) ? userID : [userID];
  };

  const RoleData: Array<TRoleData> = [
    {
      name: 'Автор',
      roleId: authorRoleID || '',
      users: userToArray(author),
      usersID: userIDToArray(authorID),
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
      users: userToArray(responsible),
      usersID: userIDToArray(responsibleID),
    },
  ];

  return RoleData.find((el) => {
    return el.name === roleName;
  });
};

export default useMembersProps;
