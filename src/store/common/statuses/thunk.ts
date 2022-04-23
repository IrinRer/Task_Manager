import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import { COMMON_STATUSES_SLICE_ALIAS } from './types';
import { api } from '../../../network';

export const fetchStatusesAction = createAsyncThunk(
  `${COMMON_STATUSES_SLICE_ALIAS}/fetchStatuses`,
  // @ts-ignore
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        '/api/v1.0/task/statuses',
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
