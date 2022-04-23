import { AxiosError } from 'axios';

export const COMMON_PRIORITIES_SLICE_ALIAS = 'common/priorities';

export interface ICommonPrioritiesReducer {
  priorities: Array<IPriority>;
  loading: boolean;
  error: AxiosError | null;
}

export interface IPriority {
  task_priority_id: string;
  name: string;
  created: string;
  updated: string;
}

export interface IPopulatedPriority {
  task_priority_id: string;
  name: string;
  created: string;
  updated: string;
  label: string;
  value: string;
}
