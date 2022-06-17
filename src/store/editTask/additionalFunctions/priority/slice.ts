import { AxiosError } from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPriority } from 'store/common/priorities/types';
import { fetchTaskAction } from 'store/common/task/thunk';
import { IResponseTask } from 'store/common/task/types';
import { PRIORITY_SLICE_ALIAS, IPriorityReducer } from './types';
import { changePriorityAction } from './thunk';

const initialState: IPriorityReducer = {
  priority: null,
  loading: false,
  error: null,
};

export const prioritySlice = createSlice({
  name: PRIORITY_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [changePriorityAction.pending.type]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changePriorityAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IPriority>,
    ) => {
      state.priority = payload;
      state.loading = false;
    },
    [changePriorityAction.rejected.type]: (
      state,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.priority = null;
      state.loading = false;
      state.error = payload;
    },

    [fetchTaskAction.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.priority = payload.priority;
      state.loading = false;
    },
  },
});

export default prioritySlice.reducer;
