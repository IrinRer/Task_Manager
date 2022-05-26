import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { DEFAULT_CHECK_LIST_TITLE } from 'constants/common';
import { IResponseTask } from 'store/common/task/types';
import { api } from 'network';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { getTaskId } from 'store/editTask/selectors';
import { RootState } from 'store';

export const addCheckListAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/addCheckList`,
  async (_, { getState, rejectWithValue }) => {
    const task_id = getTaskId(getState() as RootState);

    try {
      const newCheckList: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists`,
        {
          title: DEFAULT_CHECK_LIST_TITLE,
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

export const addCheckListActionExtraReducers = {
  [addCheckListAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkList = true;
  },
  [addCheckListAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<IResponseTask>,
  ) => {
    state.data = payload;
    state.editLoading.checkList = false;
  },
  [addCheckListAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkList = payload;
    state.editLoading.checkList = false;
  },
};
