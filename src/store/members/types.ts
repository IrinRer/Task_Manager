import { AxiosError } from 'axios';
import { IResponseTask} from 'store/task/types';

export const ONETASK_SLICE_MEMBERS = 'members';

export interface IMembersReducer{
  response: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
  members: Array<ITaskMembers> | null;  
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