import axios, { AxiosInstance } from 'axios';
import { RootState, store } from 'store';
import { getBackendURL } from '../helpers/common';

export const api = (requireAuth: boolean = false): AxiosInstance => {
  const state: RootState = store.getState();
  const { token } = state.auth.token;
  return axios.create({
    baseURL: getBackendURL(requireAuth),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};
