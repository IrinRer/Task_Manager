import { AxiosError } from 'axios';
import { BlockType, SortField, TTask } from 'constants/types/common';

export const TASKS_SLICE_ALIAS = 'Thetasks';
export type TViewParameters = {
  sortField: SortField;
  page: number;
  tasksOnPage: number;
};
export type TAllViewParameters = {
  in: TViewParameters;
  work: TViewParameters;
  done: TViewParameters;
};

export interface ITasksReducer {
  tasks: Array<TTask> | null;
  itemsTotal: number;
  loading: boolean;
  auth: boolean;
  error: AxiosError | null;
  onlyMyTasks: boolean;
  viewParameters: TAllViewParameters;
}
export type TsetSortFieldPayload = {
  blockType: BlockType;
  sortField: SortField;
};
export type TsetPagePayload = {
  blockType: BlockType;
  page: number;
};
export type TsetTasksOnPagePayload = {
  blockType: BlockType;
  tasksOnPage: number;
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