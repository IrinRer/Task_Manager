import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { IResponseTask } from 'store/common/task/types';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';

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

export const setTaskTitleExtraReducers = {
  [setTaskTitle.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.title = true;
    state.editError.title = null;
  },
  [setTaskTitle.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.title = false;
  },
  [setTaskTitle.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editLoading.title = false;
    state.editError.title = payload;
  },
};
