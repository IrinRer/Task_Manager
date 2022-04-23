import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { COMMON_PRIORITIES_SLICE_ALIAS } from './types';
import { api } from '../../../network';

export const fetchPrioritiesAction = createAsyncThunk(
  `${COMMON_PRIORITIES_SLICE_ALIAS}/fetchPriorities`,
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        '/api/v1.0/task/priorities',
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
