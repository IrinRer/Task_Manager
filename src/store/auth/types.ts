import { AxiosError } from 'axios';

export const AUTH_SLICE_ALIAS = 'auth'

export type TAuth = {
  token: string | null;
  authInProgress: boolean;
  userData: TUserData | null;
  error: AxiosError | null;
};

export type TUserData = {
  user_id: number;
  email: string;
  full_name: string;
};

export type TAuthRequest = {
  token: string;
};

export type TAuthResponse = {
  token: string;
  userData: TUserData;
};
