import { AxiosError } from 'axios';

export const VALID_SLICE_ALIAS = 'valid';

export interface IValidReducer {
  userID: string | null;
  error: AxiosError | null;
}
