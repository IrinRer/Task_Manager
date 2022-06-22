import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { BlockType, TTask } from 'constants/types/common';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import {
  getUsersIdFromRoles,
  isAuthor,
  isImplementer,
  isResponsible,
  isWatcher,
} from 'store/common/task/selectors';
import {
  blockTasksTotal,
  getMyTasks,
  getTasksSortedPaginated,
} from './service';

export const selectTasks = (state: RootState) => state.tasks.tasks;

export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectTasksTotalCount = (state: RootState) =>
  state.tasks.itemsTotal;
export const getOnlyMyTasksFlag = (state: RootState) => state.tasks.onlyMyTasks;
export const getViewParameters = (state: RootState) =>
  state.tasks.viewParameters;

// Возвращает либо все задачи либо мои задачи в зависимости от флага tasks.onlyMyTasks
export const getTasksToShow = createSelector(
  selectTasks,
  getOnlyMyTasksFlag,
  getVerifyIdUser,
  getMyTasks,
);

// новая пагинация и сортировка

export const getIncomingTasksTotal = createSelector(getTasksToShow, (tasks) =>
  blockTasksTotal(tasks, BlockType.in),
);

export const getIncomingTasksSortedPaginated = createSelector(
  getTasksToShow,
  getViewParameters,
  (tasks, viewParameters) =>
    getTasksSortedPaginated(tasks, viewParameters, BlockType.in),
);

export const getWorkTasksTotal = createSelector(getTasksToShow, (tasks) =>
  blockTasksTotal(tasks, BlockType.work),
);

export const getWorkTasksSortedPaginated = createSelector(
  getTasksToShow,
  getViewParameters,
  (tasks, viewParameters) =>
    getTasksSortedPaginated(tasks, viewParameters, BlockType.work),
);
export const getDoneTasksTotal = createSelector(getTasksToShow, (tasks) =>
  blockTasksTotal(tasks, BlockType.done),
);

export const getDoneTasksSortedPaginated = createSelector(
  getTasksToShow,
  getViewParameters,
  (tasks, viewParameters) =>
    getTasksSortedPaginated(tasks, viewParameters, BlockType.done),
);

export const getTaskById = createSelector(
  [selectTasks, (_, taskId: string) => taskId],
  (tasks, taskId: string) => tasks.find((task) => task.task_id === taskId),
);

export const getTaskWatchersIDParams = createSelector(
  [
    (state: RootState) => state.tasks.tasks,
    (state, task: TTask | undefined) => task?.roles,
  ],
  (items, roles) => getUsersIdFromRoles(roles?.filter(isWatcher)),
);

export const getTaskImplementersIDParams = createSelector(
  [
    (state: RootState) => state.tasks.tasks,
    (state, task: TTask | undefined) => task?.roles,
  ],
  (items, roles) => getUsersIdFromRoles(roles?.filter(isImplementer)),
);

export const getTaskResponsibleIDParams = createSelector(
  [
    (state: RootState) => state.tasks.tasks,
    (state, task: TTask | undefined) => task?.roles,
  ],
  (items, roles) => roles?.find(isResponsible)?.assign_user.user_id,
);

export const getTaskAuthorIDParams = createSelector(
  [
    (state: RootState) => state.tasks.tasks,
    (state, task: TTask | undefined) => task?.roles,
  ],
  (items, roles) => roles?.find(isAuthor)?.assign_user.user_id,
);
