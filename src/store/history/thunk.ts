import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'network';
import { HISTORY_SLICE_ALIAS, IFileThunkHistory } from './types';

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
      return rejectWithValue(error.message);
    }
  },
);

export const viewFileHistory = createAsyncThunk(
  `${HISTORY_SLICE_ALIAS}/view`,
  async (file: IFileThunkHistory, { rejectWithValue }) => {
    try {
      const response = await api().get(
        `/api/v1.0/storage/files/${file.fileId}/download`,
        { responseType: 'blob' },
      );

      return {
        url: URL.createObjectURL(response.data),
        name: file.name,
        type: file.type,
        size: file.size,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
