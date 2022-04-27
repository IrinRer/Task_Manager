import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  COMMON_TAGS_SLICE_ALIAS,
  ICommonTagsReducer,
  ITag,
} from 'store/common/tags/types';
import { AxiosError } from 'axios';
import { fetchTagsAction } from './thunk';

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
  },
});

export default commonTagsSlice.reducer;
