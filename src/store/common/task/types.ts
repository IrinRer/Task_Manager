import { AxiosError } from 'axios';
import { IUser } from 'store/users/types';
import { IPriority } from '../priorities/types';
import { IRoles } from '../roles/types';
import { ITag } from '../tags/types';

export const ONETASK_SLICE_ALIAS = 'onetask';

export interface ITaskReducer {
  data: IResponseTask | null;
  loading: boolean;
  error: AxiosError | null;
}

export interface IResponseTask {
  task_id: string;
  title: string;
  description: string;
  exec_start: string | null;
  exec_stop: string | null;
  created: Date;
  updated: Date;
  status: {
    task_status_id: string;
    name: string;
    form_result_required: false;
  };
  priority: IPriority | null;
  form: null;
  form_available: false;
  form_result: null;
  roles: Array<ITaskRoles> | null;
  tags: Array<ITag>;
  progress: null;
  check_lists: [];
  storage_files: any;
  storage_files_meta: {
    total: number;
  };
  permissions: Array<string>;
}

export interface ITaskRoles {
  task_to_role_id: string;
  task: {
    task_id: string;
  };
  task_role: IRoles;
  assign_user: IUser;
}
