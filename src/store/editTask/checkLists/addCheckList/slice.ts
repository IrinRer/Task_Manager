import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ADD_CHECKLIST_SLICE_ALIAS, IAddCheckListReducer } from './types';
import { addCheckList } from './thunk';

const initialState: IAddCheckListReducer = {
  isLoading: false,
  error: null,
};

export const addCheckListSlice = createSlice({
  name: ADD_CHECKLIST_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [addCheckList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addCheckList.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [addCheckList.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default addCheckListSlice.reducer;
