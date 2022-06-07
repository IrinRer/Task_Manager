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

export const assignTagAction = createAsyncThunk(
  `${TAG_SLICE_ALIAS}/assign`,
  async (tag: ITagThunk, { rejectWithValue }) => {
    try {
      await api().post(`/api/v1.0/task/tasks/${tag.task_id}/tag-assign`, {
        task_tag_id: tag.task_tag_id,
      });
      return tag;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка добавления тега!' });
      return rejectWithValue(error);
    }
  },
);

export const unassignTagAction = createAsyncThunk(
  `${TAG_SLICE_ALIAS}/unassign`,
  async (tag: any, { rejectWithValue }) => {
    try {
      await api().post(`/api/v1.0/task/tasks/${tag.taskId}/tag-unassign`, {
        task_tag_id: tag.tagId,
      });
      return tag.name;
    } catch (error) {
      notification.error({ message: 'Произошла ошибка открепления метки!' });
      return rejectWithValue(error);
    }
  },
);
