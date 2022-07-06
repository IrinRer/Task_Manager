import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  SET_CHECKLIST_TITLE_SLICE_ALIAS,
  ISetCheckListTitleReducer,
} from './types';
import { setCheckListTitle } from './thunk';

const initialState: ISetCheckListTitleReducer = {
  isLoading: false,
  error: null,
};

export const setCheckListTitleSlice = createSlice({
  name: SET_CHECKLIST_TITLE_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [setCheckListTitle.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setCheckListTitle.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [setCheckListTitle.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export default setCheckListTitleSlice.reducer;
