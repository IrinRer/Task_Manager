import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';

import { api } from 'network';
import { fetchTaskAction } from 'store/common/task/thunk';

import {
  ITaskAssignUser,
  EDIT_TASK_SLICE_ALIAS,
  ITaskAssignGroupUser,
} from 'store/editTask/types';

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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  },
);

export const setTaskMemberAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setMember`,
  async (data: ITaskAssignUser, { rejectWithValue, dispatch }) => {
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
      if (error.response!.status !== 500 && error.response!.status !== 400) {
        notification.error({ message: 'Ошибка назначения участника' });
      } else {
        await dispatch(fetchTaskAction(data.task_id));
      }
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTaskMemberAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/deleteMember`,
  async (data: ITaskAssignUser, { rejectWithValue, dispatch }) => {
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
      if (error.response!.status !== 500 && error.response!.status !== 400) {
        notification.error({ message: 'Ошибка удаления участника' });
      } else {
        await dispatch(fetchTaskAction(data.task_id));
      }
      return rejectWithValue(error.message);
    }
  },
);

export const setTaskMemberGroupAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setMemberGroup`,
  async (data: ITaskAssignGroupUser, { rejectWithValue, dispatch }) => {
    try {
      data.assign_users_ids?.forEach((element) => {
        dispatch(
          setTaskMemberAction({
            task_id: data.task_id,
            assign_user_id: element,
            task_role_id: data.task_role_id,
          }),
        );

        if (data.task_role_id !== data.watcher_role_id) {
          dispatch(
            setTaskMemberAction({
              task_id: data.task_id,
              assign_user_id: element,
              task_role_id: data.watcher_role_id,
            }),
          );
        }
      });

      return 1;
    } catch (error) {
      notification.error({ message: 'Ошибка назначения участников' });
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTaskMemberGroupAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/deleteMemberGroup`,
  async (data: ITaskAssignGroupUser, { rejectWithValue, dispatch }) => {
    try {
      data.assign_users_ids?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id: data.task_id,
            assign_user_id: element,
            task_role_id: data.task_role_id,
          }),
        );

        if (data.task_role_id !== data.watcher_role_id) {
          dispatch(
            deleteTaskMemberAction({
              task_id: data.task_id,
              assign_user_id: element,
              task_role_id: data.watcher_role_id,
            }),
          );
        }
      });
      return 1;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления участников' });
      return rejectWithValue(error.message);
    }
  },
);
