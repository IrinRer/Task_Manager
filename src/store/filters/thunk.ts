import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { RootState } from 'store';
import { selectTaskQuery } from 'store/filters/selectors';
import { api } from 'network';
import { AxiosPromise } from 'axios';
import { selectPopulatedStatuses } from 'store/common/statuses/selectors';
import { FILTERS_SLICE_ALIAS } from './types';

export const fetchStatusCounters = createAsyncThunk(
  `${FILTERS_SLICE_ALIAS}/fetchStatusCounters`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const tasksQuery = selectTaskQuery(state);
      const statuses = selectPopulatedStatuses(state);

      const queries: Array<AxiosPromise> = statuses.map((status) => {
        return api().get('/api/v1.0/task/tasks', {
          params: {
            search: tasksQuery.searchQuery || null,
            assign_user_id: tasksQuery.users.map((user) => user.user_id),
            status_id: status.task_status_id,
            tag_id: tasksQuery.tags.map((tag) => tag.task_tag_id),
            storage_files_gte: tasksQuery.attachments ? 1 : null,
            priority_id: tasksQuery.priorities,
            progress_gte: tasksQuery.progress,
            page: 1,
            per_page: 1,
          },
        });
      });

      return Promise.all(queries).then((responses) =>
        responses.map((response) => ({
          task_status_id: response.config.params.status_id,
          value: response.data.pagination.items_total,
        })),
      );
    } catch (error) {
      notification.error({ message: error.message });
      return rejectWithValue(error.message);
    }
  },
);
