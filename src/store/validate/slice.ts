import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IValidReducer, VALID_SLICE_ALIAS } from 'store/validate/types';
import { fetchValidAction } from 'store/validate/thunk';

const initialState: IValidReducer = {
  userID: 'loading',
  error: null,
};

export const validSlice = createSlice({
  name: VALID_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchValidAction.pending.type]: (state: IValidReducer) => {
      state = initialState;
    },
    [fetchValidAction.fulfilled.type]: (
      state: IValidReducer,
      { payload }: PayloadAction<string>,
    ) => {
      state.userID = payload;
    },
    [fetchValidAction.rejected.type]: (
      state: IValidReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.userID = null;
      state.error = payload;
    },
  },
});

export default validSlice.reducer;
