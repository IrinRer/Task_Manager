import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { setTaskId } from 'store/common/task/slice';
import { addTask } from 'store/tasks/slice';
import { api } from '../../network';
import { CREATE_TASK_SLICE_ALIAS, ICreateTaskArg } from './types';

export const createTaskAction = createAsyncThunk(
  `${CREATE_TASK_SLICE_ALIAS}/createTask`,
  async (arg: ICreateTaskArg, { rejectWithValue, dispatch }) => {
    try {
      const response = await api().post(`/api/v1.0/task/tasks`, {
        title: arg.title,
        task_status_id: arg.task_status_id,
      });
      dispatch(setTaskId(response.data.data.task_id));
      dispatch(addTask(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка создания задачи' });
      return rejectWithValue(error.message);
    }
  },
);
