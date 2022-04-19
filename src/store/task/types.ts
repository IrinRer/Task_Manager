import { AxiosError } from 'axios';

export const ONETASK_SLICE_ALIAS = 'onetask';
export const ONETASK_SLICE_CREATE = 'createTask';
export const ONETASK_SLICE_STATUSES = 'statuses';
export const ONETASK_SLICE_MEMBERS = 'members';
export const ONETASK_SLICE_WATCHERS = 'watchers';
export const ONETASK_SLICE_ROLES = 'roles';

export interface ITaskReducer{
  response: any | null;
  loading: boolean;
  error: AxiosError | null;
  statuses: Array<IStatuses> | null;
  allroles: Array<IRoles> | null;
  members: Array<ITaskMembers> | null;  
  selectedMembers: Array<string> | string | null; 
  unselectedMembers: Array<string> | string | null; 
  data: {
    task_id: string, 
    title:string, 
    description:string, 
    status: {task_status_id:string, name:string},
    roles: Array<ITaskRoles> | null,
    // watchers: Array<ITaskWatchers> | null,
  };
}

export interface ITaskRoles {
    task_to_role_id: string,
    task: {
      task_id: string
    },
    task_role: IRoles,
    assign_user: IAssignUser
}

export interface IAssignUser {
  user_id:string,
  name:string,
  logo: string,
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

export interface IResponseTask{
    relation: {
      task_to_role_id: string,
      task_id: string,
      assign_user_id: string,
      task_role_id: string,
      created: Date,
      updated: Date,
    },
    data: {
      task_id: string,
      title: string,
      description: string,
      exec_start: null,
      exec_stop: null,
      created: Date,
      updated: Date,
      status: {
        task_status_id: string,
        name: string,
        form_result_required: false
      },
      priority: null,
      form: null,
      form_available: false,
      form_result: null,
      roles: Array<ITaskRoles> | null
      tags: [],
      progress: null,
      check_lists: [],
      storage_files: [],
      storage_files_meta: {
        total: number
      },
      permissions: Array<string>
    }
  }