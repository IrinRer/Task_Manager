import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { api } from 'network';
import { PRIORITY_SLICE_ALIAS, IPriorityThunk } from './types';

export const changePriorityAction = createAsyncThunk(
  `${PRIORITY_SLICE_ALIAS}/change`,
  async (priority: IPriorityThunk, { rejectWithValue }) => {
    try {
      const response = await api().post(
        `/api/v1.0/task/tasks/${priority.task_id}/priority-change`,
        { task_priority_id: priority.priority || null },
      );
      return response.data.data.priority;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка!' });
      return rejectWithValue(error);
    }
  },
);
