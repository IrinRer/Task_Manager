import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { TASKS_SLICE_ALIAS } from 'store/tasks/types';
import { api } from '../../network';
import { selectTaskQuery } from '../filters/selectors';

export const fetchTasksAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/fetchAll`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
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
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
