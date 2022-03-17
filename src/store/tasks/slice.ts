import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITasksReducer, TASKS_SLICE_ALIAS } from 'store/tasks/types';
import { fetchTasksAction } from 'store/tasks/thunk';

const initialState: ITasksReducer = {
  response: null,
  loading: false,
  error: null,
};

export const tasksSlice = createSlice({
  // Название должно быть уникальным!
  name: TASKS_SLICE_ALIAS,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTasksAction.pending.type]: (state: ITasksReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchTasksAction.fulfilled.type]: (
      state: ITasksReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [fetchTasksAction.rejected.type]: (
      state: ITasksReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export default tasksSlice.reducer;
