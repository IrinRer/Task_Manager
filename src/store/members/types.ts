import { AxiosError } from 'axios';
import { IResponseTask } from 'store/task/types';

export const ONETASK_SLICE_MEMBERS = 'members';

export interface IMembersReducer{
  response: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
  members: Array<ITaskMembers> | null;  
  selectedMembers: Array<string> | string | null; 
  unselectedMembers: Array<string> | string | null; 
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