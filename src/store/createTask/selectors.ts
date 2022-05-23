import { RootState } from 'store';

export const getNewTaskSuccess = (state: RootState): boolean =>
  state.createTask.success;
export const getNewTaskId = (state: RootState): string | undefined =>
  state.createTask.task?.task_id;
