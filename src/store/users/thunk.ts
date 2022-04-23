import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { USERS_SLICE_ALIAS } from './types';
import { api } from '../../network';

export const fetchUsersAction = createAsyncThunk(
  `${USERS_SLICE_ALIAS}/fetchUsers`,
  // @ts-ignore
  async (query?: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        '/api/v1.0/external/users',
        {
          params: {
            query,
          },
        },
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
