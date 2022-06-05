import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  COMMON_TAGS_SLICE_ALIAS,
  ICommonTagsReducer,
  ITag,
} from 'store/common/tags/types';
import { AxiosError } from 'axios';
import { createTagAction } from 'store/editTask/additionalFunctions/tag/thunk';
import { deleteTagAction, fetchTagsAction } from './thunk';


const initialState: ICommonTagsReducer = {
  tags: [],
  loading: false,
  error: null,
};

export const commonTagsSlice = createSlice({
  name: COMMON_TAGS_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTagsAction.pending.type]: (state: ICommonTagsReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchTagsAction.fulfilled.type]: (
      state: ICommonTagsReducer,
      { payload }: PayloadAction<Array<ITag>>,
    ) => {
      state.tags = payload;
      state.loading = false;
    },
    [fetchTagsAction.rejected.type]: (
      state: ICommonTagsReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tags = [];
      state.loading = false;
      state.error = payload;
    },
    
    // нужен, чтобы при добавлении нового тега
    [createTagAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITag>,
    ) => {
      state.tags = state.tags?.concat(payload);
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
      state.tags = state.tags?.filter(
        (item) => item.name !== payload.name,
      );
      state.loading = false;
    },
    [deleteTagAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tags = initialState.tags;
      state.loading = false;
      state.error = payload;
    },
  },
});

export default commonTagsSlice.reducer;
