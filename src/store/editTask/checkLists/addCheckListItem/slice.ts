import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { addCheckListItem } from './thunk';

import {
  ADD_CHECKLIST_ITEM_SLICE_ALIAS,
  IAddCheckListItemReducer,
} from './types';

const initialState: IAddCheckListItemReducer = {
  isLoading: false,
  error: null,
};

export const addCheckListItemSlice = createSlice({
  name: ADD_CHECKLIST_ITEM_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [addCheckListItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addCheckListItem.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [addCheckListItem.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default addCheckListItemSlice.reducer;
