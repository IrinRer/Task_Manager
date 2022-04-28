import { AxiosError } from 'axios';

export const COMMON_STATUSES_SLICE_ALIAS = 'common/statuses';

export interface ICommonStatusesReducer {
  statuses: Array<IStatus>;
  loading: boolean;
  error: AxiosError | null;
}

export interface IStatus {
  task_status_id: string;
  name: string;
  name_group: string;
  form_result_required: boolean;
  created: string;
  updated: string;
}

export interface IPopulatedStatus {
  task_status_id: string;
  value: string;
  name: string;
  label: string;
  name_group: string;
  form_result_required: boolean;
  created: string;
  updated: string;
}
