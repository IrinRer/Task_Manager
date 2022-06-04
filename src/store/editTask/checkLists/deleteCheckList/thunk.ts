import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { setEditTask } from 'store/editTask/slice';
import { DELETE_CHECKLIST_SLICE_ALIAS } from './types';

export const deleteCheckList = createAsyncThunk(
  `checkLists/${DELETE_CHECKLIST_SLICE_ALIAS}`,
  async (check_list_id: string, { getState, rejectWithValue, dispatch }) => {
    const task_id = getTaskId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${task_id}/check-list-un-assign`,
        {
          check_list_id,
        },
      );

      dispatch(setEditTask(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления чеклиста' });
      return rejectWithValue(error);
    }
  },
);
