import { RootState } from 'store';

export const getNewTaskSuccess = (state: RootState): boolean =>
  state.createTask.success;
