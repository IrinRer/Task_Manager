import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store/index';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { DELETE_CHECKLIST_ITEM_SLICE_ALIAS } from './types';
import { removeCheckListItemFromTask } from '../../slice';

export const deleteCheckListItem = createAsyncThunk(
  `checkLists/${DELETE_CHECKLIST_ITEM_SLICE_ALIAS}`,
  async (
    check_list_item_id: string,
    { getState, rejectWithValue, dispatch },
  ) => {
    const check_list_id = getCheckListId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().delete(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items/${check_list_item_id}`,
      );

      dispatch(removeCheckListItemFromTask(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка удаления элемента чеклиста' });
      return rejectWithValue(error);
    }
  },
);
