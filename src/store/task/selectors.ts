import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
import { RootState } from 'store';
import { IUser } from 'store/users/types';
import { ITaskRoles } from './types';

function getAuthor(element: ITaskRoles) {
  if (element.task_role.name !== ROLES.author.name) {
    return false;
  }
  return { element };
}

function getWatcher(element: ITaskRoles) {
  if (element.task_role.name !== ROLES.watcher.name) {
    return false;
  }
  const el = element.assign_user.name;
  return { el };
}

function getImplementer(element: ITaskRoles) {
  if (element.task_role.name !== ROLES.implementer.name) {
    return false;
  }
  const el = element.assign_user.name;
  return { el };
}

function getResponsible(element: ITaskRoles) {
  if (element.task_role.name !== ROLES.responsible.name) {
    return false;
  }
  const el = element.assign_user.name;
  return { el };
}

function getUsersFromRoles(roles: Array<ITaskRoles> | undefined) {
  const arr: IUser[] = roles?.map((element) => element.assign_user) || [];
  return arr;
}

function getUsersIdFromRoles(roles: Array<ITaskRoles> | undefined) {
  const arr: Array<string> =
    roles?.map((element) => element.assign_user.user_id) || [];
  return arr;
}

const taskData = (state: RootState) => state.onetask.data;

export const taskRoles = createSelector(taskData, (data) => data?.roles);

export const getTaskId = createSelector(taskData, (data) => data?.task_id);
export const getTitle = createSelector(taskData, (data) => data?.title);
export const getDescription = createSelector(
  taskData,
  (data) => data?.description,
);
export const getTaskStatus = createSelector(
  taskData,
  (data) => data?.status?.name,
);

export const getTaskAuthor = createSelector(
  taskRoles,
  (roles) => roles?.find(getAuthor)?.assign_user,
);
export const getTaskResponsible = createSelector(
  taskRoles,
  (roles) => roles?.find(getResponsible)?.assign_user,
);
export const getTaskImplementer = createSelector(
  taskRoles,
  (roles) => roles?.find(getImplementer)?.assign_user,
);
export const getTaskWatchers = createSelector(taskRoles, (roles) =>
  getUsersFromRoles(roles?.filter(getWatcher)),
);
export const getTaskWatchersID = createSelector(taskRoles, (roles) =>
  getUsersIdFromRoles(roles?.filter(getWatcher)),
);

export const getNewSelectedMembers = (state: RootState) =>
  state.onetask.selectedMembers;
export const getUnselectedMembers = (state: RootState) =>
  state.onetask.unselectedMembers;

export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error.task;
