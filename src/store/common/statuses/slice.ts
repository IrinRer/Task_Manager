import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  COMMON_STATUSES_SLICE_ALIAS,
  ICommonStatusesReducer,
  IStatus,
} from 'store/common/statuses/types';
import { AxiosError } from 'axios';
import { fetchStatusesAction } from './thunk';

const initialState: ICommonStatusesReducer = {
  statuses: [],
  loading: false,
  error: null,
};

export const commonStatusesSlice = createSlice({
  name: COMMON_STATUSES_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStatusesAction.pending.type]: (state: ICommonStatusesReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchStatusesAction.fulfilled.type]: (
      state: ICommonStatusesReducer,
      { payload }: PayloadAction<Array<IStatus>>,
    ) => {
      state.statuses = payload;
      state.loading = false;
    },
    [fetchStatusesAction.rejected.type]: (
      state: ICommonStatusesReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.statuses = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default commonStatusesSlice.reducer;
