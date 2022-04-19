import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AxiosError } from 'axios';
import { ITasksReducer, TASKS_SLICE_ALIAS, TTasksResponse } from 'store/tasks/types';
import { fetchTasksAction } from 'store/tasks/thunk'; 


const initialState: ITasksReducer = { 
  response: null,
  loading: false,
  // auth временное свойство, необходимое на данном этапе для корректной работы роута
  auth: true,  
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
      { payload }: PayloadAction<TTasksResponse>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [fetchTasksAction.rejected.type]: (
      state: ITasksReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<AxiosError>, 
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export default tasksSlice.reducer;
