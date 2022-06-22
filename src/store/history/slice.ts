import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { historyAction, historyCommandAction } from './thunk';
import { HISTORY_SLICE_ALIAS } from './types';

const initialState: any = {
  data: [],
  command: [],
};

export const historySlice = createSlice({
  name: HISTORY_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [historyAction.pending.type]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [historyAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      state.data = payload;
    },
    [historyAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.data = [];
      state.loading = false;
      state.error = payload;
    },

    [historyCommandAction.pending.type]: (state: any) => {
      state.loading = true;
      state.error = null;
    },
    [historyCommandAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<any>,
    ) => {
      state.command = payload;
    },
    [historyCommandAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.command = [];
      state.loading = false;
      state.error = payload;
    },
  },
});

export default historySlice.reducer;
