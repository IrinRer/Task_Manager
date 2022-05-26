import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import {
  EDIT_TASK_SLICE_ALIAS,
  ICheckListChangeCompleteStatus,
  IEditTaskReducer,
} from 'store/editTask/types';
import { ICheckListItem } from 'store/common/task/types';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { api } from 'network';

export const setCompleteCheckListItemAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setCompleteCheckListItemAction`,
  async (
    data: ICheckListChangeCompleteStatus,
    { getState, rejectWithValue },
  ) => {
    const check_list_id = getCheckListId(getState() as RootState);
    const { check_list_item_id, complete } = data;

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items/${check_list_item_id}/complete-change`,
        { complete },
      );

      return response.data.data;
    } catch (error) {
      notification.error({
        message: 'Ошибка изменения статуса элемента чеклиста',
      });
      return rejectWithValue(error);
    }
  },
);

export const setCompleteCheckListItemsActionExtraReducers = {
  [setCompleteCheckListItemAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkListItem = true;
  },
  [setCompleteCheckListItemAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<ICheckListItem>,
  ) => {
    const checkListItemIndex: number =
      state.data!.check_lists[0].items.findIndex(
        (item) => item.check_list_item_id === payload.check_list_item_id,
      );

    state.data!.check_lists[0].items[checkListItemIndex] = payload;

    state.editLoading.checkListItem = false;
  },
  [setCompleteCheckListItemAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkListItem = payload;
    state.editLoading.checkListItem = false;
  },
};
