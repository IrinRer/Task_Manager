import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskReducer, ONETASK_SLICE_ALIAS } from 'store/task/types';
import { createTaskAction, fetchAllStatuses, fetchTaskAction} from 'store/task/thunk';

const initialState: ITaskReducer = {
  response: null,
  createdTask: null,
  loading: false,
  error: null,
  statuses: null,
  data: {title: "", description: "", task_status_id: ""},
};

export const onetaskSlice = createSlice({
  // Название должно быть уникальным!
  name: ONETASK_SLICE_ALIAS,
  initialState,
  reducers: {
    clearDataTask: (state: ITaskReducer) => {
      state.data = initialState.data;
    },
    createTitle: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    createDescription: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    createStatusId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.task_status_id = action.payload;
    },
  },
  extraReducers: {
    [fetchTaskAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [fetchTaskAction.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [fetchTaskAction.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },


    [createTaskAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [createTaskAction.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.createdTask = payload;
      state.loading = false;
    },
    [createTaskAction.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.createdTask = null;
      state.loading = false;
      state.error = payload;
    },


    [fetchAllStatuses.pending.type]: (state: ITaskReducer) => {
      state.error = null;
    },
    [fetchAllStatuses.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.statuses = payload;
    },
    [fetchAllStatuses.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.statuses = null;
      state.error = payload;
    },



  },
});

export const {clearDataTask} = onetaskSlice.actions;
export const { createTitle } = onetaskSlice.actions;
export const { createDescription} = onetaskSlice.actions;
export const {createStatusId} = onetaskSlice.actions;
export default onetaskSlice.reducer;
