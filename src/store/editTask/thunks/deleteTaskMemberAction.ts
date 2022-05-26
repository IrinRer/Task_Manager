import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  EDIT_TASK_SLICE_ALIAS,
  IEditTaskReducer,
  ITaskAssignUser,
} from 'store/editTask/types';
import { IResponseTask } from 'store/common/task/types';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';

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

export const deleteTaskMemberActionExtraReducers = {
  [deleteTaskMemberAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.members = true;
    state.editError.delMembers = null;
  },
  [deleteTaskMemberAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.members = false;
  },
  [deleteTaskMemberAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.delMembers = payload;
    state.unselectedMembers = null;
    state.editLoading.members = false;
  },
};
