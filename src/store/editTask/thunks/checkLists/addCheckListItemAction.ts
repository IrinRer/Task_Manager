import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { RootState } from 'store/index';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { getCheckListId } from 'store/editTask/selectors';
import { api } from 'network';
import { ICheckListItem } from 'store/common/task/types';

export const addCheckListItemAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/addCheckListItem`,
  async (message: string, { getState, rejectWithValue }) => {
    const check_list_id = getCheckListId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items`,
        {
          message,
        },
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления элемента чеклиста' });
      return rejectWithValue(error);
    }
  },
);

export const addCheckListItemActionExtraReducers = {
  [addCheckListItemAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkListItem = true;
  },
  [addCheckListItemAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<ICheckListItem>,
  ) => {
    state.data?.check_lists[0].items.push(payload);
    state.editLoading.checkListItem = false;
  },
  [addCheckListItemAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkListItem = payload;
    state.editLoading.checkListItem = false;
  },
};
