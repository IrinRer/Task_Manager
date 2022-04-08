import { AxiosError } from 'axios';

export const AUTH_SLICE_ALIAS = 'auth';

export interface IAuthReducer {
  token: null | string;
  loading: boolean;
  error: AxiosError | null;
}
