import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { COMMON_TAGS_SLICE_ALIAS } from './types';
import { api } from '../../../network';

export const fetchTagsAction = createAsyncThunk(
  `${COMMON_TAGS_SLICE_ALIAS}/fetchTags`,
  // @ts-ignore
  async (query?: string, { rejectWithValue }) => {
    try {
      const response = await api().get('/api/v1.0/task/tags', {
        params: {
          query: query || null,
        },
      });

      return response.data.data;
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
