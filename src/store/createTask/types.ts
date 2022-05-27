import { AxiosError } from 'axios';
import { TTask } from 'constants/types/common';

export const CREATE_TASK_SLICE_ALIAS = 'createTask';

export interface ICreateTaskReducer {
  task: TTask | null;
  loading: boolean;
  error: AxiosError | null;
  success: boolean;
}

// используется в thunk для создания задачи
export interface ICreateTaskArg {
  title: string;
  task_status_id: string;
}

export interface TTaskCloneResponse {
  clone: TTask;
}
