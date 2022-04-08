import axios from 'axios';
import { getBackendURL } from 'helpers/common';

export const axiosInstance = axios.create({
  baseURL: getBackendURL(true),
  headers: {},
});
