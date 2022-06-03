import {
  createTagAction,
  deleteTagAction,
} from 'store/editTask/additionalFunctions/tag/thunk';
import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from 'store/common/tags/types';
import { fetchTaskAction } from 'store/common/task/thunk';
import { TAG_SLICE_ALIAS, ITagReducer } from './types';

const initialState: ITagReducer = {
  sentTag: [],
  loading: false,
  error: null,
};

export const tagSlice = createSlice({
  name: TAG_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [createTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag = state.sentTag?.concat(payload);
      state.loading = false;
    },
    [createTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },

    // нужен, чтобы получить теги для задачи, если они у нее уже есть
    // и отобразить их
    [fetchTaskAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.sentTag = payload.tags.map(({ task_tag }) => task_tag);
      state.loading = false;
    },

    [deleteTagAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.sentTag = state.sentTag?.filter(
        (item) => item.name !== payload.name,
      );
      state.loading = false;
    },
    [deleteTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.sentTag = initialState.sentTag;
      state.loading = false;
      state.error = payload;
    },
  },
});

export default tagSlice.reducer;
