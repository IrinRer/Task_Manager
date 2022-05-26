import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { notification } from 'antd';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { ICheckListItem } from 'store/common/task/types';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { api } from 'network';

export const deleteCheckListItemAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/deleteCheckListItem`,
  async (check_list_item_id: string, { getState, rejectWithValue }) => {
    const check_list_id = getCheckListId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().delete(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items/${check_list_item_id}`,
      );

      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления элемента чеклиста' });
      return rejectWithValue(error);
    }
  },
);

export const deleteCheckListItemActionExtraReducers = {
  [deleteCheckListItemAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkListItem = true;
  },
  [deleteCheckListItemAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<ICheckListItem>,
  ) => {
    state.data!.check_lists[0].items = state.data!.check_lists[0].items.filter(
      (item) => item.check_list_item_id !== payload.check_list_item_id,
    );
    state.editLoading.checkListItem = false;
  },
  [deleteCheckListItemAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkListItem = payload;
    state.editLoading.checkListItem = false;
  },
};
