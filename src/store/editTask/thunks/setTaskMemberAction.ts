import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  EDIT_TASK_SLICE_ALIAS,
  IEditTaskReducer,
  ITaskAssignUser,
} from 'store/editTask/types';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponseTask } from 'store/common/task/types';
import { api } from 'network';
import { notification } from 'antd';

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

export const setTaskMemberActionExtraReducers = {
  [setTaskMemberAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.members = true;
    state.editError.setMembers = null;
  },
  [setTaskMemberAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.members = false;
  },
  [setTaskMemberAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.setMembers = payload;
    state.selectedMembers = null;
    state.editLoading.members = false;
  },
};
