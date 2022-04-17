import { AxiosError } from 'axios';

export const ONETASK_SLICE_ALIAS = 'onetask';
export const ONETASK_SLICE_CREATE = 'createTask';
export const ONETASK_SLICE_STATUSES = 'statuses';
export const ONETASK_SLICE_USER = 'user';
export const ONETASK_SLICE_MEMBERS = 'members';
export const ONETASK_SLICE_WATCHERS = 'watchers';
export const ONETASK_SLICE_ROLES = 'roles';

export interface ITaskReducer{
  // TODO: Добавить типизацию
  response: any | null;
  createdTask: any | null;
  changeWatchers: any | null;
  loading: boolean;
  error: AxiosError | null;
  statuses: Array<IStatuses> | null;
  allroles: Array<IRoles> | null;
  members: Array<ITaskMembers> | null;  
  selectedMembers: Array<string> | null; 
  unselectedMembers: Array<string> | null; 
  data: {
    task_id: string, 
    title:string, 
    description:string, 
    status: {task_status_id:string, name:string},
    roles: Array<ITaskRoles> | null,
    watchers: Array<ITaskWatchers> | null,
  };
}

export interface ITaskRoles {
    task_to_role_id: string,
    task: {
      task_id: string
    },
    task_role: {
      task_role_id: string,
      name: string,
      name_group: string,
      max_user_assigned: number,
      is_author: true,
      created: Date,
      updated: Date
    },
    assign_user: {
      user_id: string,
      name: string,
      logo: string
    }
}

export interface ITaskMembers {
    user_id:string,
    name:string,
    logo: string,
    permissions: Array<string>
}

export interface ITaskWatchers {
  task_id: string, 
  assign_user_id: string, 
  task_role_id:string
}

export interface IStatuses{
    task_status_id:string,
    name:string,
    name_group:string,
    form_result_required:boolean,
    created:Date,
    updated:Date
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