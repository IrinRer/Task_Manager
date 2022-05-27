import { createAsyncThunk } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosResponse } from 'axios';
import useMembersProps from 'components/Task/Info/MembersHook/useMembersProps';
import { ROLES } from 'constants/task';

import { api } from 'network';

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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  },
);

export const setTaskMemberGroupAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setMemberGroup`,
  async (data: ITaskAssignGroupUser, { rejectWithValue, dispatch }) => {
    try {
      const { task_id } = data;
      const role_id = data.task_role_id;
      const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

      data.assign_users_ids?.forEach((element) => {
        dispatch(
          setTaskMemberAction({
            task_id,
            assign_user_id: element,
            task_role_id: role_id,
          }),
        );

        if (role_id !== watcherRoleId && watcherRoleId) {
          dispatch(
            setTaskMemberAction({
              task_id,
              assign_user_id: element,
              task_role_id: watcherRoleId,
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
      const { task_id } = data;
      const role_id = data.task_role_id;
      const watcherRoleId = useMembersProps(ROLES.watcher)?.roleId;

      data.assign_users_ids?.forEach((element) => {
        dispatch(
          deleteTaskMemberAction({
            task_id,
            assign_user_id: element,
            task_role_id: role_id,
          }),
        );

        if (role_id !== watcherRoleId && watcherRoleId) {
          dispatch(
            deleteTaskMemberAction({
              task_id,
              assign_user_id: element,
              task_role_id: watcherRoleId,
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
