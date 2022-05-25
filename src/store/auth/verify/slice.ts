import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVerifyReducer, VERIFY_SLICE_ALIAS } from 'store/auth/verify/types';
import { fetchVerifyAction } from 'store/auth/verify/thunk';

const initialState: IVerifyReducer = {
  userID: null,
  loading: false,
  error: null,
};

export const verifySlice = createSlice({
  name: VERIFY_SLICE_ALIAS,
  initialState,
  reducers: {
    resetVerify: () => initialState,
  },
  extraReducers: {
    [fetchVerifyAction.pending.type]: (state: IVerifyReducer) => {
      state.loading = true;
    },
    [fetchVerifyAction.fulfilled.type]: (
      state: IVerifyReducer,
      { payload }: PayloadAction<string>,
    ) => {
      state.userID = payload;
      state.loading = false;
    },
    [fetchVerifyAction.rejected.type]: (
      state: IVerifyReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.userID = null;
      state.error = payload;
      state.loading = false;
    },
  },
});

export const { resetVerify } = verifySlice.actions;

export default verifySlice.reducer;
