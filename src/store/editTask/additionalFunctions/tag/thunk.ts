import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { api } from 'network';
import { TAG_SLICE_ALIAS, ITagThunk } from './types';

export const createTagAction = createAsyncThunk(
  `${TAG_SLICE_ALIAS}/create-assign`,
  async (tag: ITagThunk, { rejectWithValue }) => {
    try {
      const responseCreate = await api().post(`/api/v1.0/task/tags`, {
        name: tag.name,
        color: tag.color,
      });

      await api().post(`/api/v1.0/task/tasks/${tag.task_id}/tag-assign`, {
        task_tag_id: responseCreate.data.data.task_tag_id,
      });

      return responseCreate.data.data;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка добавления тега!' });
      return rejectWithValue(error);
    }
  },
);

export const deleteTagAction = createAsyncThunk(
  `${TAG_SLICE_ALIAS}/delete`,
  async (tagId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await api().delete(`/api/v1.0/task/tags/${tagId}`);
      notification.success({ message: 'Метка успешно удалена' });
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка удаления!' });
      return rejectWithValue(error);
    }
  },
);
