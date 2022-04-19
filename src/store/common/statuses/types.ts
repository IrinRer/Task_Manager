import { AxiosError } from 'axios';
import { IResponseTask } from 'store/task/types';

export const ONETASK_SLICE_STATUSES = 'statuses';

export interface IStatusesReducer{
  response: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
  statuses: Array<IStatuses> | null; 
}

export interface IStatuses{
  task_status_id:string,
  name:string,
  name_group:string,
  form_result_required:boolean,
  created:Date,
  updated:Date
}