import axios, { AxiosInstance } from 'axios';
import { RootState, store } from 'store';
import { getVerifyToken } from 'store/auth/token/selectors';
import { getBackendURL } from '../helpers/common';

export const api = (requireAuth: boolean = false): AxiosInstance => {
  const state: RootState = store.getState();
  const token = getVerifyToken(state);

  return axios.create({
    baseURL: getBackendURL(requireAuth),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};
