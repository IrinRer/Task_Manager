import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store/index';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { addCheckListItemToTask } from 'store/editTask/slice';
import { ADD_CHECKLIST_ITEM_SLICE_ALIAS } from 'store/editTask/checkLists/addCheckListItem/types';

export const addCheckListItem = createAsyncThunk(
  `checkLists/${ADD_CHECKLIST_ITEM_SLICE_ALIAS}`,
  async (message: string, { getState, rejectWithValue, dispatch }) => {
    const check_list_id = getCheckListId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/items`,
        {
          message,
        },
      );

      dispatch(addCheckListItemToTask(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({ message: 'Ошибка добавления элемента чеклиста' });
      return rejectWithValue(error);
    }
  },
);
