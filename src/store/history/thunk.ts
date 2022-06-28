import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { api } from 'network';
import { HISTORY_SLICE_ALIAS } from './types';

export const historyAction = createAsyncThunk(
  `${HISTORY_SLICE_ALIAS}/fetchAll`,
  async (history: { taskId: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await api().get('/api/v1.0/history/commands', {
        params: {
          relation_id: history.taskId,
          page: history.page,
          per_page: 7,
        },
      });

      return {
        count: response.data.pagination.items_total,
        data: response.data.data,
        taskId: history.taskId,
      };
    } catch (error) {
      notification.error({ message: 'Ошибка отображения истории' });
      return rejectWithValue(error.message);
    }
  },
);
