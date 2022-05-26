import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { IResponseTask } from 'store/common/task/types';
import { getTaskId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { api } from 'network';

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

export const deleteCheckListActionExtraReducers = {
  [deleteCheckListAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkList = true;
  },
  [deleteCheckListAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.checkList = false;
  },
  [deleteCheckListAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkList = payload;
    state.editLoading.checkList = false;
  },
};
