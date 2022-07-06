import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { TAG_SLICE_ALIAS } from 'store/editTask/additionalFunctions/tag/types';
import { api } from 'network';
import { COMMON_TAGS_SLICE_ALIAS } from './types';

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

export const deleteTagAction = createAsyncThunk(
  `${TAG_SLICE_ALIAS}/delete`,
  async (tagId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await api().delete(`/api/v1.0/task/tags/${tagId}`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка удаления!' });
      return rejectWithValue(error.message);
    }
  },
);

