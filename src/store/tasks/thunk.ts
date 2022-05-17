import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { RootState } from 'store';
import { TASKS_SLICE_ALIAS } from 'store/tasks/types';
import { api } from '../../network';
import { selectTaskQuery } from '../filters/selectors';
import { filtersRollBack, filtersSyncState } from '../filters/slice';

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

      dispatch(filtersSyncState());

      return response.data;
    } catch (error) {
      dispatch(filtersRollBack());

      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);

interface IArg {
  task_id: string;
  task_status_id: string;
}

export const changeTaskStatusAction = createAsyncThunk(
  `${TASKS_SLICE_ALIAS}/changeTaskStatus`,
  async (arg: IArg, { rejectWithValue }) => {
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