import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { ONETASK_SLICE_ROLES } from './types';

export const fetchAllRoles = createAsyncThunk(
  `${ONETASK_SLICE_ROLES}/fetchAll`,
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        `/api/v1.0/task/roles?page=1&per_page=50`,
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error);
    }
  },
);
