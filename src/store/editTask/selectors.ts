import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  getAuthor,
  getImplementer,
  getResponsible,
  getUsersFromRoles,
  getUsersIdFromRoles,
  getWatcher,
} from 'store/common/task/selectors';

const editTaskData = (state: RootState) => state.editTask.data;

export const getNewSelectedMembers = (state: RootState) =>
  state.editTask.selectedMembers;

export const getUnselectedMembers = (state: RootState) =>
  state.editTask.unselectedMembers;

export const taskRoles = createSelector(editTaskData, (data) => data?.roles);

export const getTaskId = createSelector(editTaskData, (data) => data?.task_id);

export const getTitle = createSelector(editTaskData, (data) => data?.title);

export const getDescription = createSelector(
  editTaskData,
  (data) => data?.description,
);
export const getTaskStatus = createSelector(
  editTaskData,
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

export const getEditTaskLoading = (state: RootState) =>
  state.editTask.editLoading;

export const getEditTaskError = (state: RootState) =>
  state.editTask.editError.task;
