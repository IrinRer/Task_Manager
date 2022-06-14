import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  SET_CHECKLIST_ITEM_POSITION_SLICE_ALIAS,
  ISetCheckListItemPositionReducer,
} from './types';
import { setCheckListItemPosition } from './thunk';

const initialState: ISetCheckListItemPositionReducer = {
  draggedItemId: '',
  isLoading: false,
  error: null,
};

export const setCheckListItemPositionSlice = createSlice({
  name: SET_CHECKLIST_ITEM_POSITION_SLICE_ALIAS,
  initialState,
  reducers: {
    setDraggedItemId: (
      state: ISetCheckListItemPositionReducer,
      { payload }: PayloadAction<string>,
    ) => {
      state.draggedItemId = payload;
    },
  },
  extraReducers: {
    [setCheckListItemPosition.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setCheckListItemPosition.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [setCheckListItemPosition.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

export const { setDraggedItemId } = setCheckListItemPositionSlice.actions;

export default setCheckListItemPositionSlice.reducer;
