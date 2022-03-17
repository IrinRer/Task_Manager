import { RootState } from 'store';

export const getTasks = (state: RootState) => state.tasks.response;
export const getTasksLoading = (state: RootState) => state.tasks.loading;
export const getTasksError = (state: RootState) => state.tasks.error;