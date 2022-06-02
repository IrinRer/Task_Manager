import { AxiosError } from 'axios';

export const VERIFY_SLICE_ALIAS = 'verify';

export interface IVerifyReducer {
  userID: string | null;
  error: AxiosError | null;
  loading: boolean | null;
}
