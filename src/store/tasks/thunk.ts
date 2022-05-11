import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { RootState } from 'store';
import {
  ICreateTaskArg,
  IStatusChangeArg,
  TASKS_SLICE_ALIAS,
} from 'store/tasks/types';
import { api } from '../../network';
import { selectTaskQuery } from '../filters/selectors';

export const fetchTasksAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/fetchAll`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const tasksQuery = selectTaskQuery(state);

      const response = await api().get('/api/v1.0/task/tasks', {
        params: {
          search: tasksQuery.searchQuery || null,
          assign_user_id: tasksQuery.users.map((user) => user.user_id),
          status_id: tasksQuery.statuses,
          tag_id: tasksQuery.tags.map((tag) => tag.task_tag_id),
          storage_files_gte: tasksQuery.attachments ? 1 : null,
          priority_id: tasksQuery.priorities,
          progress_gte: tasksQuery.progress,
          page: 1,
          per_page: 50,
        },
      });

      return response.data;
    } catch (error) {
      notification.error({ message: 'Ошибка данных' });
      return rejectWithValue(error.message);
    }
  },
);

export const changeTaskStatusAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/changeTaskStatus`,
  async (arg: IStatusChangeArg, { rejectWithValue }) => {
    try {
      const response = await api().post(
        `/api/v1.0/task/tasks/${arg.task_id}/status-change`,
        {
          task_status_id: arg.task_status_id,
        },
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка изменения статуса' });
      return rejectWithValue(error.message);
    }
  },
);

export const createTaskAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/createTask`,
  async (arg: ICreateTaskArg, { rejectWithValue }) => {
    try {
      const response = await api().post(`/api/v1.0/task/tasks`, {
        title: arg.title,
        task_status_id: arg.task_status_id,
      });
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка создания задачи' });
      return rejectWithValue(error.message);
    }
  },
);
