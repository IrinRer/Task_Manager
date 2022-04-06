import { AxiosError } from 'axios';

export const ONETASK_SLICE_ALIAS = 'onetask';
export const ONETASK_SLICE_CREATE = 'createTask';
export const ONETASK_SLICE_STATUSES = 'statuses';
export const ONETASK_SLICE_USER = 'user';

export interface ITaskReducer {
  // TODO: Добавить типизацию
  response: any | null;
  createdTask: any | null;
  loading: boolean;
  error: AxiosError | null;

  statuses: [{
    task_status_id:string,
    name:string,
    name_group:string,
    form_result_required:boolean,
    created:Date,
    updated:Date }] | null;
    
  data: {title:string, description:string, task_status_id:string};
}
