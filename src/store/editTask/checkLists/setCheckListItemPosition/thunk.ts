import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { getCheckListId } from 'store/editTask/selectors';
import { SET_CHECKLIST_ITEM_POSITION_SLICE_ALIAS } from './types';
import { getDraggedItemId } from './selectors';
import { updateCheckList } from '../../slice';

export const setCheckListItemPosition = createAsyncThunk(
  `checkLists/${SET_CHECKLIST_ITEM_POSITION_SLICE_ALIAS}`,
  async (after_id: string, { getState, rejectWithValue, dispatch }) => {
    const check_list_id = getCheckListId(getState() as RootState);
    const check_list_item_id = getDraggedItemId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/position-change`,
        {
          check_list_item_id,
          after_id,
        },
      );

      dispatch(updateCheckList(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({
        message: 'Ошибка изменения позиции элемента',
      });
      return rejectWithValue(error.message);
    }
  },
);
