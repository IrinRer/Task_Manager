import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';

export const CREATE_TASK_SLICE_ALIAS = 'createTask';

export interface ICreateTaskReducer {
  task: IResponseTask | null;
  showTaskCreatedMessage: boolean;
  loading: boolean;
  error: AxiosError | null;
  success: boolean;
}

// используется в thunk для создания задачи
export interface ICreateTaskArg {
  title: string;
  task_status_id: string;
}
export interface ICloneTaskArg {
  id: string;
  edit: boolean; // если true - открывается редактирование.
}

export interface TTaskCloneResponse {
  clone: IResponseTask;
}

export interface ICloneTaskAction {
  task: IResponseTask;
  edit: boolean;
}
