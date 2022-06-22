import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';
import { cloneTaskAction, createTaskAction } from './thunk';
import {
  CREATE_TASK_SLICE_ALIAS,
  ICloneTaskAction,
  ICreateTaskReducer,
} from './types';

const initialState: ICreateTaskReducer = {
  task: null,
  showTaskCreatedMessage: false,
  loading: false,
  error: null,
  success: false,
};

export const createTaskSlice = createSlice({
  name: CREATE_TASK_SLICE_ALIAS,
  initialState,
  reducers: {
    resetNewTaskSuccess: (state: ICreateTaskReducer) => {
      state.success = false;
      state.task = null;
    },
    setShowTaskCreatedMessage: (
      state: ICreateTaskReducer,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.showTaskCreatedMessage = payload;
    },
  },
  extraReducers: {
    [createTaskAction.pending.type]: (state: ICreateTaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [createTaskAction.fulfilled.type]: (
      state: ICreateTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.loading = false;
      state.task = payload;
      state.showTaskCreatedMessage = true;
      state.success = true;
    },

    [createTaskAction.rejected.type]: (
      state: ICreateTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [cloneTaskAction.pending.type]: (state: ICreateTaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [cloneTaskAction.fulfilled.type]: (
      state: ICreateTaskReducer,
      { payload }: PayloadAction<ICloneTaskAction>,
    ) => {
      state.loading = false;
      state.task = payload.task;
      state.success = payload.edit;
    },
    [cloneTaskAction.rejected.type]: (
      state: ICreateTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetNewTaskSuccess, setShowTaskCreatedMessage } =
  createTaskSlice.actions;
export default createTaskSlice.reducer;
