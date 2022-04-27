import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import Cookies from 'universal-cookie';
import { axiosInstance } from 'network';
import { ROUTES } from '../../../constants/routes';
import { AUTH_SLICE_ALIAS } from './types';

const cookies = new Cookies();
export const fetchAuthAction = createAsyncThunk(
  `${AUTH_SLICE_ALIAS}/fetchToken`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/ladum/token/generate', {
        user_id: id,
      });
      cookies.set('token', response.data.token, { path: ROUTES.tasks.path });
      return response.data.token;
    } catch (error) {
      notification.error(
        rejectWithValue(error.response.status).payload === 404
          ? { message: 'Пользователь с указанным id не найден' }
          : { message: error.message },
      );
      return rejectWithValue(error.message);
    }
  },
);
