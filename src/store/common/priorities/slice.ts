import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  COMMON_PRIORITIES_SLICE_ALIAS,
  ICommonPrioritiesReducer,
  IPriority,
} from 'store/common/priorities/types';
import { AxiosError } from 'axios';
import { fetchPrioritiesAction } from './thunk';

const initialState: ICommonPrioritiesReducer = {
  priorities: [],
  loading: false,
  error: null,
};

export const CommonPrioritiesSlice = createSlice({
  name: COMMON_PRIORITIES_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPrioritiesAction.pending.type]: (state: ICommonPrioritiesReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPrioritiesAction.fulfilled.type]: (
      state: ICommonPrioritiesReducer,
      { payload }: PayloadAction<Array<IPriority>>,
    ) => {
      state.priorities = payload;
      state.loading = false;
    },
    [fetchPrioritiesAction.rejected.type]: (
      state: ICommonPrioritiesReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.priorities = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default CommonPrioritiesSlice.reducer;
