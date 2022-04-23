import { AxiosError } from 'axios';

export const TASKS_SLICE_ALIAS = 'tasks';

export interface ITasksReducer {
  tasks: Array<TTask> | null;
  itemsTotal: number;
  loading: boolean;
  auth: boolean;
  error: AxiosError | null;
}

export type TTask = {
  task_id: string;
  title: string;
  description: string;
};

export interface ITasksResponse {
  data: Array<TTask>;
  pagination: IPagination;
}

export interface IPagination {
  items_count: number;
  items_total: number;
  page_current: number;
  page_total: number;
  per_page: number;
}
