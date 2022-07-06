import { AxiosError } from 'axios';
import { TRights } from 'constants/rights';
import { ROLES } from 'constants/types/common';

export const ONETASK_SLICE_ROLES = 'roles';

export interface IRolesReducer {
  loading: boolean;
  error: AxiosError | null;
  allroles: Array<IRoles> | null;
}
export interface IRoles {
  task_role_id: string;
  name: ROLES;
  name_group: string;
  max_user_assigned: number;
  is_author: boolean;
  created: string;
  updated: string;
}

export type TasksRoles = {
  task_id: string;
  roles: Array<string>;
};

export type TasksMaxRole = {
  task_id: string;
  maxrole: TRights;
};
