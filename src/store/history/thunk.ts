import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { api } from 'network';
import { HISTORY_SLICE_ALIAS } from './types';

export const historyAction = createAsyncThunk(
  `${HISTORY_SLICE_ALIAS}/fetchAll`,
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await api().get('/api/v1.0/history/commands', {
        params: {
          relation_id: taskId,
          page: 1,
          per_page: 50,
        },
      });

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка отображения истории' });
      return rejectWithValue(error.message);
    }
  },
);

export const historyCommandAction = createAsyncThunk(
  `${HISTORY_SLICE_ALIAS}/fetchAllCommand`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api().get('/api/v1.0/history/available-commands');

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка отображения истории' });
      return rejectWithValue(error.message);
    }
  },
);
