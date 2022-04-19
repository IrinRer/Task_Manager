import { AxiosError } from 'axios';

export const TASKS_SLICE_ALIAS = 'tasks';

export interface ITasksReducer {
  // TODO: Добавить типизацию
  response: TTasksResponse | null;
  loading: boolean;
  auth: boolean;
  error: AxiosError | null;
}

type TTasksResponseItem = {
  task_id: string;
  title: string;
  description: string;
};

export type TTasksResponse = TTasksResponseItem[];
