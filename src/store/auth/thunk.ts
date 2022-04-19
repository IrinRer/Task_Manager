import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import Cookies from 'universal-cookie';
import { AUTH_SLICE_ALIAS } from 'store/auth/types';
import { axiosInstance } from 'network';

const cookies = new Cookies();
export const fetchAuthAction = createAsyncThunk(
  `${AUTH_SLICE_ALIAS}/fetchAll`,
  async (id: string, { rejectWithValue }) => {
    // cookies.set('token', null);
    try {
      const response = await axiosInstance.post('/ladum/token/generate', {
        user_id: id,
      });
      cookies.set('token', response.data.token, { path: '/' });
      return response.data.token;
    } catch (error) {
      notification.error({ message: 'Пользователь с указанным id не найден' });
      return rejectWithValue(error.message);
    }
  },
);
