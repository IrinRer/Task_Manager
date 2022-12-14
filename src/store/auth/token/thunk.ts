import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import Cookies from 'universal-cookie';
import { api } from 'network';
import { ROUTES } from '../../../constants/routes';
import { AUTH_SLICE_ALIAS } from './types';

const cookies = new Cookies();
export const fetchAuthAction = createAsyncThunk(
  `${AUTH_SLICE_ALIAS}/fetchToken`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api(true).post('/ladum/token/generate', {
        user_id: id,
      });
      cookies.set('token', response.data.token, { path: ROUTES.tasks.path });
      return response.data.token;
    } catch (error) {
      notification.error(
        error.response.status === 404
          ? { message: 'Пользователь с указанным id не найден' }
          : { message: error.message },
      );
      return rejectWithValue(error.message);
    }
  },
);
