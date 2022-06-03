import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTaskId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { DEFAULT_CHECK_LIST_TITLE } from 'constants/common';
import { notification } from 'antd';
import { setEditTask } from 'store/editTask/slice';
import { ADD_CHECKLIST_SLICE_ALIAS } from './types';

export const addCheckList = createAsyncThunk(
  `checkLists/${ADD_CHECKLIST_SLICE_ALIAS}`,
  async (_, { getState, rejectWithValue, dispatch }) => {
    const task_id = getTaskId(getState() as RootState);

    try {
      const newCheckList: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists`,
        {
          title: DEFAULT_CHECK_LIST_TITLE,
        },
      );

      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${task_id}/check-list-assign`,
        {
          check_list_id: newCheckList.data.data.check_list_id,
        },
      );

      dispatch(setEditTask(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления чеклиста' });
      return rejectWithValue(error);
    }
  },
);
