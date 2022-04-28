import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
import { RootState } from 'store';
import { IUser } from 'store/users/types';
import { ITaskRoles } from './types';

function isAuthor(element: ITaskRoles) {
  return element.task_role.task_role_id !== ROLES.author.id;
}

function isWatcher(element: ITaskRoles) {
  return element.task_role.task_role_id !== ROLES.watcher.id;
}

function isImplementer(element: ITaskRoles) {
  return element.task_role.task_role_id !== ROLES.implementer.id;
}

function isResponsible(element: ITaskRoles) {
  return element.task_role.task_role_id !== ROLES.responsible.id;
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
const taskRoles = (state: RootState) => state.onetask.data.roles;

export const getTaskId = createSelector(taskData, (data) => data.task_id);
export const getTitle = createSelector(taskData, (data) => data.title);
export const getDescription = createSelector(
  taskData,
  (data) => data.description,
);
export const getTaskStatus = createSelector(
  taskData,
  (data) => data.status.name,
);

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

export const getNewSelectedMembers = (state: RootState) =>
  state.onetask.selectedMembers;
export const getUnselectedMembers = (state: RootState) =>
  state.onetask.unselectedMembers;

export const getTaskLoading = (state: RootState) => state.onetask.loading;
export const getTaskError = (state: RootState) => state.onetask.error.task;
