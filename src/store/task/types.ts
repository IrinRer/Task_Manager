import { AxiosError } from 'axios';
import { IRoles } from 'store/common/roles/types';
import { IAssignUser } from 'store/members/types';

export const ONETASK_SLICE_ALIAS = 'onetask';

export interface ITaskReducer{
  response: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
  data: {
    task_id: string, 
    title:string, 
    description:string, 
    status: {task_status_id:string, name:string},
    roles: Array<ITaskRoles> | null,
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