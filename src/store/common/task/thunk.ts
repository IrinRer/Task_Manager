import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';

import { api } from 'network';

import { ONETASK_SLICE_ALIAS } from 'store/common/task/types';

export const fetchTaskAction = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/fetchAll`,
  async (task_id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        `/api/v1.0/task/tasks/${task_id}`,
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка открытия задачи' });
      return rejectWithValue(error.message);
    }
  },
);
