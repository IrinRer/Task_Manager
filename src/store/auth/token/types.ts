import { AxiosError } from 'axios';

export const AUTH_SLICE_ALIAS = 'auth';

export interface IAuthReducer {
  token: string | null;
  loading: boolean;
  error: AxiosError | null;
}
