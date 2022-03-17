import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { TAuth, AUTH_SLICE_ALIAS, TAuthResponse } from 'store/auth/types';
import { fetchUserDataAction } from 'store/auth/thunk';

const initialState: TAuth = {
  token: null,
  authInProgress: false,
  userData: null,
  error: null,
};

const setError = (state: TAuth, { payload }: PayloadAction<AxiosError>) => ({
  ...initialState,
  authInProgress: true,
  error: payload,
});

export const authSlice = createSlice({
  name: AUTH_SLICE_ALIAS,
  initialState,
  reducers: {
    logoutAction: () => initialState,
  },
  extraReducers: {
    // fetchUserDataAction
    [fetchUserDataAction.pending.type]: (state) => {
      state.authInProgress = true;
    },
    [fetchUserDataAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<TAuthResponse>,
    ) => {
      state.token = payload.token;
      state.userData = payload.userData;
      state.authInProgress = false;
    },
    [fetchUserDataAction.rejected.type]: setError,
  },
});

export const { logoutAction } = authSlice.actions;

export default authSlice.reducer;
