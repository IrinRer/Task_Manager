import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { deleteTagAction, fetchTagsAction } from 'store/common/tags/thunk';
import { IResponseTask } from 'store/common/task/types';
import { fetchTaskAction } from 'store/common/task/thunk';
import { ITag } from 'store/common/tags/types';
import { TAG_SLICE_ALIAS, ITagReducer } from './types';

// ITagReducer
const initialState: any = {
  sentTag: [],
  tags: [],
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

    [deleteTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      // state.sentTag = state.sentTag?.filter(
      //   (item) => item.name !== payload.name,
      // );
      state.sentTag = state.sentTag?.filter(
        (item) => item.name !== payload.name,
      );
      state.loading = false;
    },
  },
});

export default tagSlice.reducer;
