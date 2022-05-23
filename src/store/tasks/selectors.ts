import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { BlockType } from 'constants/types/common';
import {
  blockTasksTotal,
  getMyTasks,
  getTasksSortedPaginated,
} from './service';

export const TEST_USER_ID = 51;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectTasksTotalCount = (state: RootState) =>
  state.tasks.itemsTotal;
export const getOnlyMyTasksFlag = (state: RootState) => state.tasks.onlyMyTasks;
export const getViewParameters = (state: RootState) =>
  state.tasks.viewParameters;

// тест для роутинга
export const getTasksAuth = (state: RootState) => state.tasks.auth;

// Возвращает либо все задачи либо мои задачи в зависимости от флага tasks.onlyMyTasks
export const getTasksToShow = createSelector(
  selectTasks,
  getOnlyMyTasksFlag,
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

