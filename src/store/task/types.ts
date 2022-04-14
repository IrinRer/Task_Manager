import { AxiosError } from 'axios';

export const ONETASK_SLICE_ALIAS = 'onetask';
export const ONETASK_SLICE_CREATE = 'createTask';
export const ONETASK_SLICE_STATUSES = 'statuses';
export const ONETASK_SLICE_USER = 'user';
export const ONETASK_SLICE_MEMBERS = 'members';

export interface ITaskReducer{
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

    members: [{
      user_id:string,
      name:string,
      logo: string,
      permissions: [string]
    }];
    
  data: {
    task_id: string, 
    title:string, 
    description:string, 
    status: {task_status_id:string, name:string},
  roles: [
    {
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
    }}
  ]}
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
    permissions: [string]
}
