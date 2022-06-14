import { DATE_FORMAT_UI } from 'constants/common';
import { createSelector } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import { ITaskRoles } from 'store/common/task/types';
import { IUser } from 'store/users/types';

export function isAuthor(element: ITaskRoles): boolean {
  return element.task_role.name === ROLES.author;
}

export function isWatcher(element: ITaskRoles): boolean {
  return element.task_role.name === ROLES.watcher;
}

export function isImplementer(element: ITaskRoles): boolean {
  return element.task_role.name === ROLES.implementer;
}

export function isResponsible(element: ITaskRoles): boolean {
  return element.task_role.name === ROLES.responsible;
}

export function getUsersFromRoles(roles: Array<ITaskRoles> | undefined) {
  const arr: Array<IUser> = roles?.map((element) => element.assign_user) || [];
  return arr;
}

export function getUsersIdFromRoles(roles: Array<ITaskRoles> | undefined) {
  const arr: Array<string> =
    roles?.map((element) => element.assign_user.user_id) || [];
  return arr;
}

export const taskRoles = (state: RootState) => state.common.onetask.data?.roles;

export const getTitle = (state: RootState) => state.common.onetask.data?.title;

export const getDescription = (state: RootState) =>
  state.common.onetask.data?.description;

export const getTaskStatus = (state: RootState) =>
  state.common.onetask.data?.status?.name;

export const getTaskAuthor = createSelector(
  taskRoles,
  (roles) => roles?.find(isAuthor)?.assign_user,
);

export const getTaskResponsible = createSelector(
  taskRoles,
  (roles) => roles?.find(isResponsible)?.assign_user,
);

export const getTaskImplementers = createSelector(taskRoles, (roles) =>
  getUsersFromRoles(roles?.filter(isImplementer)),
);

export const getTaskWatchers = createSelector(taskRoles, (roles) =>
  getUsersFromRoles(roles?.filter(isWatcher)),
);

export const getTaskWatchersID = createSelector(taskRoles, (roles) =>
  getUsersIdFromRoles(roles?.filter(isWatcher)),
);

export const getTaskLoading = (state: RootState) =>
  state.common.onetask.loading;

export const getTaskError = (state: RootState) => state.common.onetask.error;

export const getTaskInfoPriority = (state: RootState) =>
  state.common.onetask.data?.priority?.task_priority_id;

export const getTaskInfoPriorityName = (state: RootState) =>
  state.common.onetask.data?.priority?.name;

export const getTaskInfoDateStop = (state: RootState) =>
  state.common.onetask.data?.exec_stop
    ? format(new Date(state.common.onetask.data?.exec_stop), DATE_FORMAT_UI)
    : undefined;

// export const taskFile = (state: RootState) =>
//   state.common.onetask?.data?.storage_files;

// export const getTaskFileImg = createSelector(taskFile, (file) =>
//   file?.filter(({ type }) => type === 'image'),
// );

// export const getTaskFileAllType = createSelector(taskFile, (file) =>
//   file?.filter(({ type }) => type !== 'image'),
// );
