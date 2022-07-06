import { AxiosError } from 'axios';

export const USERS_SLICE_ALIAS = 'users';

export interface IUsersReducer {
  users: Array<IUser>;
  loading: boolean;
  error: AxiosError | null;
}

export interface IUser {
  user_id: string;
  name: string;
  permissions?: Array<string>;
  logo?: string;
}

export interface IPopulatedUser extends IUser {
  value: string;
  key: string;
}
