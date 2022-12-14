import { RootState } from 'store';

export const getPriority = (state: RootState) =>
  state.editTask.additionalFunctions.priority?.priority;
export const getPriorityLoading = (state: RootState) =>
  state.editTask.additionalFunctions.priority.loading;
export const getPriorityError = (state: RootState) =>
  state.editTask.additionalFunctions.priority.error;
export const getPriorityName = (state: RootState) =>
  state.editTask.additionalFunctions.priority.priority?.task_priority_id;
