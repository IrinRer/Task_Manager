import { RootState } from 'store';

export const getNewTaskSuccess = (state: RootState) => state.createTask.success;
export const getNewTaskId = (state: RootState) =>
  state.createTask.task?.task_id;
