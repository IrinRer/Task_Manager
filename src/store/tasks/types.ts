import { AxiosError } from 'axios';

export const TASKS_SLICE_ALIAS = 'tasks';

export interface ITasksReducer {
  // TODO: Добавить типизацию
  response: any | null;
  loading: boolean;
  error: AxiosError | null;
}
