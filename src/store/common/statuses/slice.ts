import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IStatuses, IStatusesReducer, ONETASK_SLICE_STATUSES } from 'store/common/statuses/types';
import { AxiosError } from 'axios';
import { fetchAllStatuses } from './thunk';

const initialState: IStatusesReducer = {
  response: null,
  loading: false,
  error: null,
  statuses: null,
};

export const statusesSlice = createSlice({
  name: ONETASK_SLICE_STATUSES,
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchAllStatuses.pending.type]: (state: IStatusesReducer) => {
      state.error = null;
    },
    [fetchAllStatuses.fulfilled.type]: (
      state: IStatusesReducer,
      { payload }: PayloadAction<IStatuses[]>,
    ) => {
      state.statuses = payload;
    },
    [fetchAllStatuses.rejected.type]: (
      state: IStatusesReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.statuses = null;
      state.error = payload;
    },

  },
});

export default statusesSlice.reducer;