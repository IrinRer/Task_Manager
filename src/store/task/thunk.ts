import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { getBackendURL } from 'helpers/common';
import { api } from 'network';

import { ITaskWatchers, ONETASK_SLICE_ALIAS } from 'store/task/types';

export const fetchTaskAction = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/fetchAll`,
  async (task_id: string, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().get(
        `/api/v1.0/task/tasks/${task_id}`,
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка открытия задачи' });
      return rejectWithValue(error);
    }
  },
);

export const setTaskDescription = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/setDescription`,
  async (
    data: { task_id: string; description: string },
    { rejectWithValue },
  ) => {
    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${data.task_id}/description-change`,
        { description: data.description },
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка смены описания' });
      return rejectWithValue(error);
    }
  },
);

export const setTaskTitle = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/setTitle`,
  async (data: { task_id: string; title: string }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${data.task_id}/title-change`,
        { title: data.title },
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка смены названия' });
      return rejectWithValue(error);
    }
  },
);

export const setTaskMemberAction = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/setMember`,
  async (
    data: { task_id: string; assign_user_id: string; task_role_id: string },
    { rejectWithValue },
  ) => {
    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${data.task_id}/role-assign`,
        {
          assign_user_id: data.assign_user_id,
          task_role_id: data.task_role_id,
        },
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка назначения участника' });
      return rejectWithValue(error);
    }
  },
);

export const deleteTaskMemberAction = createAsyncThunk(
  `${ONETASK_SLICE_ALIAS}/deleteMember`,
  async (data: ITaskWatchers, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${data.task_id}/role-unassign`,
        {
          assign_user_id: data.assign_user_id,
          task_role_id: data.task_role_id,
        },
      );
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления участника' });
      return rejectWithValue(error);
    }
  },
);
