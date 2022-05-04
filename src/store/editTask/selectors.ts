import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  isAuthor,
  isImplementer,
  isResponsible,
  getUsersFromRoles,
  getUsersIdFromRoles,
  isWatcher,
} from 'store/common/task/selectors';

export const getNewSelectedMembers = (state: RootState) =>
  state.editTask.selectedMembers;

export const getOneNewSelectedMembers = (state: RootState) =>
  state.editTask.selectedMembers?.pop();

export const getUnselectedMembers = (state: RootState) =>
  state.editTask.unselectedMembers;

export const taskRoles = (state: RootState) => state.editTask.data?.roles;

export const getTaskId = (state: RootState) => state.editTask.data?.task_id;

export const getTitle = (state: RootState) => state.editTask.data?.title;

export const getDescription = (state: RootState) =>
  state.editTask.data?.description;

export const getTaskStatus = (state: RootState) =>
  state.editTask.data?.status?.name;

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

export const getEditTaskLoading = (state: RootState) =>
  state.editTask.editLoading;

export const getEditTaskError = (state: RootState) =>
  state.editTask.editError.task;
