import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  ITasksReducer,
  ITasksResponse,
  TASKS_SLICE_ALIAS,
} from 'store/tasks/types';
import { fetchTasksAction } from 'store/tasks/thunk';

const initialState: ITasksReducer = {
  tasks: null,
  itemsTotal: 0,
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
      { payload }: PayloadAction<ITasksResponse>,
    ) => {
      state.tasks = payload.data;
      state.itemsTotal = payload.pagination.items_total;
      state.loading = false;
    },
    [fetchTasksAction.rejected.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tasks = null;
      state.loading = false;
      state.error = payload;
    },
  },
});

export default tasksSlice.reducer;
