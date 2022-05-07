import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import { fetchTaskAction } from './thunk';
import { ITaskReducer, ONETASK_SLICE_ALIAS } from './types';

const initialState: ITaskReducer = {
  task_id: null,
  data: null,
  loading: false,
  error: null,
};

export const onetaskSlice = createSlice({
  name: ONETASK_SLICE_ALIAS,
  initialState,
  reducers: {
    clearDataTask: () => initialState,
    setTaskId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.task_id = action.payload;
    },
  },
  extraReducers: {
    [fetchTaskAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchTaskAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<ITaskReducer['data']>,
    ) => {
      state.data = payload;
      state.loading = false;
    },
    [fetchTaskAction.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { clearDataTask, setTaskId } = onetaskSlice.actions;
export default onetaskSlice.reducer;
