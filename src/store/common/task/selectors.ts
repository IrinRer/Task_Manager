import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
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
  const arr: IUser[] = roles?.map((element) => element.assign_user) || [];
  return arr;
}

export function getUsersIdFromRoles(roles: Array<ITaskRoles> | undefined) {
  const arr: Array<string> =
    roles?.map((element) => element.assign_user.user_id) || [];
  return arr;
}

export const taskRoles = (state: RootState) => state.common.onetask.data?.roles;

export const getHomeTaskId = (state: RootState) => state.common.onetask.task_id;

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
export const getTaskImplementer = createSelector(
  taskRoles,
  (roles) => roles?.find(isImplementer)?.assign_user,
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
