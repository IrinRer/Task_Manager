import axios, { AxiosInstance } from 'axios';
import { getToken } from 'helpers/usersInfo';
import { getBackendURL } from '../helpers/common';

export const api = (requireAuth: boolean = false): AxiosInstance => {
  const token = getToken();
  return axios.create({
    baseURL: getBackendURL(requireAuth),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};
