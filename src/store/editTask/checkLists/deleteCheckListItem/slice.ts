import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { deleteCheckListItem } from './thunk';

import {
  DELETE_CHECKLIST_ITEM_SLICE_ALIAS,
  IDeleteCheckListItemReducer,
} from './types';

const initialState: IDeleteCheckListItemReducer = {
  isLoading: false,
  error: null,
};

export const deleteCheckListItemSlice = createSlice({
  name: DELETE_CHECKLIST_ITEM_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [deleteCheckListItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteCheckListItem.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [deleteCheckListItem.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default deleteCheckListItemSlice.reducer;
