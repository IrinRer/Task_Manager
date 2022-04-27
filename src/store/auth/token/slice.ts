import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthReducer, AUTH_SLICE_ALIAS } from './types';
import { fetchAuthAction } from './thunk';

const initialState: IAuthReducer = {
  token: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: AUTH_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAuthAction.pending.type]: (state: IAuthReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAuthAction.fulfilled.type]: (
      state: IAuthReducer,
      { payload }: PayloadAction<string>,
    ) => {
      state.token = payload;
      state.loading = false;
    },
    [fetchAuthAction.rejected.type]: (
      state: IAuthReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
