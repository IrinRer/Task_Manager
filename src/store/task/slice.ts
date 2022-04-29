import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IResponseTask,
  ITaskReducer,
  ONETASK_SLICE_ALIAS,
} from 'store/task/types';
import {
  deleteTaskMemberAction,
  fetchTaskAction,
  setTaskDescription,
  setTaskMemberAction,
  setTaskTitle,
} from 'store/task/thunk';
import { AxiosError } from 'axios';

const initialState: ITaskReducer = {
  loading: false,
  selectedMembers: null,
  unselectedMembers: null,
  error: {
    task: null,
    title: null,
    desc: null,
    setMembers: null,
    delMembers: null,
  },
  data: null,
};

export const onetaskSlice = createSlice({
  name: ONETASK_SLICE_ALIAS,
  initialState,
  reducers: {
    clearDataTask: (state: ITaskReducer) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
    setNewSelectedMembers: (
      state: ITaskReducer,
      action: PayloadAction<string[] | string>,
    ) => {
      state.selectedMembers = action.payload;
    },
    setUnselectedMembers: (
      state: ITaskReducer,
      action: PayloadAction<string[]>,
    ) => {
      state.unselectedMembers = action.payload;
    },
  },
  extraReducers: {
    [fetchTaskAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error.task = null;
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
      state.error.task = payload;
    },

    [setTaskDescription.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error.desc = null;
    },
    [setTaskDescription.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.loading = false;
    },
    [setTaskDescription.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error.desc = payload;
    },

    [setTaskTitle.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error.title = null;
    },
    [setTaskTitle.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.loading = false;
    },
    [setTaskTitle.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error.title = payload;
    },

    [setTaskMemberAction.pending.type]: (state: ITaskReducer) => {
      state.error.setMembers = null;
    },
    [setTaskMemberAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
    },
    [setTaskMemberAction.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error.setMembers = payload;
      state.selectedMembers = null;
    },

    [deleteTaskMemberAction.pending.type]: (state: ITaskReducer) => {
      state.error.delMembers = null;
    },
    [deleteTaskMemberAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
    },
    [deleteTaskMemberAction.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.error.delMembers = payload;
      state.unselectedMembers = null;
    },
  },
});

export const { clearDataTask, setNewSelectedMembers, setUnselectedMembers } =
  onetaskSlice.actions;
export default onetaskSlice.reducer;
