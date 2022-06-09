import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { AxiosResponse } from 'axios';
import { api } from 'network';
import { notification } from 'antd';
import { updateCheckList } from 'store/editTask/slice';
import { SET_CHECKLIST_TITLE_SLICE_ALIAS } from './types';

export const setCheckListTitle = createAsyncThunk(
  `checkLists/${SET_CHECKLIST_TITLE_SLICE_ALIAS}`,
  async (title: string, { getState, rejectWithValue, dispatch }) => {
    const check_list_id = getCheckListId(getState() as RootState);

    try {
      const response: AxiosResponse = await api().post(
        `/api/v1.0/check-list/check-lists/${check_list_id}/title-change`,
        null,
        {
          params: {
            title,
          },
        },
      );

      dispatch(updateCheckList(response.data.data));
      return response.data.data;
    } catch (error) {
      notification.error({
        message: 'Ошибка изменения заголовка чеклиста',
      });
      return rejectWithValue(error);
    }
  },
);
