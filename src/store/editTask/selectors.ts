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

export const getModalVisible = (state: RootState) =>
  state.editTask.editTaskReducer.modalVisible;

export const getNewSelectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.selectedMembers;

export const getOneNewSelectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.selectedMembers?.pop();

export const getUnselectedMembers = (state: RootState) =>
  state.editTask.editTaskReducer.unselectedMembers;

export const taskRoles = (state: RootState) =>
  state.editTask.editTaskReducer.data?.roles;

export const getTask = (state: RootState) =>
  state.editTask.editTaskReducer.data;

export const getTaskId = (state: RootState) =>
  state.editTask.editTaskReducer.data?.task_id;

export const getTitle = (state: RootState) =>
  state.editTask.editTaskReducer.data?.title;

export const getDescription = (state: RootState) =>
  state.editTask.editTaskReducer.data?.description;

export const getTaskStatus = (state: RootState) =>
  state.editTask.editTaskReducer.data?.status?.name;

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
export const getTaskImplementersID = createSelector(taskRoles, (roles) =>
  getUsersIdFromRoles(roles?.filter(isImplementer)),
);

export const getEditTaskLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.task;

export const getEditTitleLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.title;

export const getEditDescLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.desc;

export const getEditMembersLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.members;

export const getEditTaskError = (state: RootState) =>
  state.editTask.editTaskReducer.editError.task;

export const getEditStatusLoading = (state: RootState) =>
  state.editTask.editTaskReducer.editLoading.status;
