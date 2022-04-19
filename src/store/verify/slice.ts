import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVerifyReducer, VERIFY_SLICE_ALIAS } from 'store/verify/types';
import { fetchVerifyAction } from 'store/verify/thunk';

const initialState: IVerifyReducer = {
  userID: 'loading',
  error: null,
};

export const verifySlice = createSlice({
  name: VERIFY_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVerifyAction.pending.type]: (state: IVerifyReducer) => {
      state = initialState;
    },
    [fetchVerifyAction.fulfilled.type]: (
      state: IVerifyReducer,
      { payload }: PayloadAction<string>,
    ) => {
      state.userID = payload;
    },
    [fetchVerifyAction.rejected.type]: (
      state: IVerifyReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.userID = null;
      state.error = payload;
    },
  },
});

export default verifySlice.reducer;
