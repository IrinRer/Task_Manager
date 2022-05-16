import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';

import { api } from 'network';

import { ITaskAssignUser, EDIT_TASK_SLICE_ALIAS } from 'store/editTask/types';
import { getTaskId } from './selectors';
import { RootState } from '../index';

export const setTaskDescription = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setDescription`,
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
  `${EDIT_TASK_SLICE_ALIAS}/setTitle`,
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
  `${EDIT_TASK_SLICE_ALIAS}/setMember`,
  async (data: ITaskAssignUser, { rejectWithValue }) => {
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
  `${EDIT_TASK_SLICE_ALIAS}/deleteMember`,
  async (data: ITaskAssignUser, { rejectWithValue }) => {
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

export const deleteCheckListAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/deleteCheckList`,
  async (check_list_id: string, { getState, rejectWithValue }) => {
    const task_id = getTaskId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${task_id}/check-list-un-assign`,
        {
          check_list_id,
        },
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления чеклиста' });
      return rejectWithValue(error);
    }
  },
);

export const addCheckListAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/addCheckList`,
  async (_, { getState, rejectWithValue }) => {
    const task_id = getTaskId(getState() as RootState);

    try {
      const newCheckList: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists`,
        {
          title: 'Чек-лист',
        },
      );

      const response: AxiosResponse = await api().post(
        `/api/v1.0/task/tasks/${task_id}/check-list-assign`,
        {
          check_list_id: newCheckList.data.data.check_list_id,
        },
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления чеклиста' });
      return rejectWithValue(error);
    }
  },
);
