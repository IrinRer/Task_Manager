import { AxiosError } from 'axios';
import { IResponseTask } from 'store/task/types';

export const ONETASK_SLICE_ROLES = 'roles';

export interface IRolesReducer{
  response: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
  allroles: Array<IRoles> | null;
}
export interface IRoles{
  task_role_id: string,
  name: string,
  name_group: string,
  max_user_assigned: number,
  is_author: boolean,
  created: Date,
  updated: Date
}
