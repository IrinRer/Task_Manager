import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store/index';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { ICheckListChangeCompleteStatus } from 'store/editTask/types';
import { updateCheckListItem } from 'store/editTask/slice';
import { SET_COMPLETE_CHECKLIST_ITEM_SLICE_ALIAS } from './types';

export const setCompleteCheckListItem = createAsyncThunk(
  `checkLists/${SET_COMPLETE_CHECKLIST_ITEM_SLICE_ALIAS}`,
  async (
    data: ICheckListChangeCompleteStatus,
    { getState, rejectWithValue, dispatch },
  ) => {
    const check_list_id = getCheckListId(getState() as RootState);
    const { check_list_item_id, complete } = data;

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items/${check_list_item_id}/complete-change`,
        { complete },
      );

      dispatch(updateCheckListItem(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({
        message: 'Ошибка изменения статуса элемента чеклиста',
      });
      return rejectWithValue(error);
    }
  },
);
