import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { DELETE_CHECKLIST_SLICE_ALIAS, IDeleteCheckListReducer } from './types';
import { deleteCheckList } from './thunk';

const initialState: IDeleteCheckListReducer = {
  isLoading: false,
  error: null,
};

export const deleteCheckListSlice = createSlice({
  name: DELETE_CHECKLIST_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [deleteCheckList.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteCheckList.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [deleteCheckList.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default deleteCheckListSlice.reducer;
