import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { setCompleteCheckListItem } from './thunk';

import {
  ISetCompleteCheckListItemReducer,
  SET_COMPLETE_CHECKLIST_ITEM_SLICE_ALIAS,
} from './types';

const initialState: ISetCompleteCheckListItemReducer = {
  isLoading: false,
  error: null,
};

export const setCompleteCheckListItemSlice = createSlice({
  name: SET_COMPLETE_CHECKLIST_ITEM_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [setCompleteCheckListItem.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setCompleteCheckListItem.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [setCompleteCheckListItem.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default setCompleteCheckListItemSlice.reducer;
