import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { IResponseTask } from 'store/common/task/types';

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

export const setTaskDescriptionExtraReducers = {
  [setTaskDescription.pending.type]: (state: IEditTaskReducer) => {
    state.editError.desc = null;
    state.editLoading.desc = true;
  },
  [setTaskDescription.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.desc = false;
  },
  [setTaskDescription.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editLoading.desc = false;
    state.editError.desc = payload;
  },
};
