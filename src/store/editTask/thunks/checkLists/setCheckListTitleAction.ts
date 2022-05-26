import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { EDIT_TASK_SLICE_ALIAS, IEditTaskReducer } from 'store/editTask/types';
import { getCheckListId } from 'store/editTask/selectors';
import { RootState } from 'store';
import { api } from 'network';
import { ICheckList } from 'store/common/task/types';

export const setCheckListTitleAction = createAsyncThunk(
  `${EDIT_TASK_SLICE_ALIAS}/setCheckListTitle`,
  async (title: string, { getState, rejectWithValue }) => {
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
      return response.data.data;
    } catch (error) {
      notification.error({
        message: 'Ошибка изменения заголовка чеклиста',
      });
      return rejectWithValue(error);
    }
  },
);

export const setCheckListTitleActionExtraReducers = {
  [setCheckListTitleAction.pending.type]: (state: IEditTaskReducer) => {
    state.editLoading.checkListTitle = true;
  },
  [setCheckListTitleAction.fulfilled.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<ICheckList>,
  ) => {
    if (state.data?.check_lists) {
      state.data.check_lists[0].title = payload.title;
      state.data.check_lists[0].updated = payload.updated;
    }

    state.editLoading.checkListTitle = false;
  },
  [setCheckListTitleAction.rejected.type]: (
    state: IEditTaskReducer,
    { payload }: PayloadAction<AxiosError>,
  ) => {
    state.editError.checkListTitle = payload;
    state.editLoading.checkListTitle = false;
  },
};
