import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { historyAction } from './thunk';
import { HISTORY_SLICE_ALIAS, IHistoryPayload, IHistoryReducer } from './types';

const initialState: IHistoryReducer = {
  data: [],
  loading: false,
  error: null
};

export const historySlice = createSlice({
  name: HISTORY_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [historyAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [historyAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<Array<IHistoryPayload>>,
    ) => {
      state.data = payload;
      state.loading = false;
    },
    [historyAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.data = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default historySlice.reducer;
