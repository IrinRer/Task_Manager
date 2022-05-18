import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { IStatusChangeArg } from 'constants/types/common';
import { RootState } from 'store';
import { TASKS_SLICE_ALIAS } from 'store/tasks/types';
import { api } from '../../network';
import { selectTaskQuery } from '../filters/selectors';
import { resetPages } from './slice';

export const fetchTasksAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/fetchAll`,
  async (_, { rejectWithValue, getState, dispatch }) => {
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

      // при обновлении списка задач - применении фильтров - сбрасываем страницы на 1-е.
      dispatch(resetPages());

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

export const deleteTaskAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/deleteTask`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api().delete(`/api/v1.0/task/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления задачи' });
      return rejectWithValue(error.message);
    }
  },
);
