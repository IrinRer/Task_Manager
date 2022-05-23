import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEditTaskReducer, EDIT_TASK_SLICE_ALIAS } from 'store/editTask/types';
import {
  changeEditTaskStatusAction,
  deleteTaskMemberAction,
  setTaskDescription,
  setTaskMemberAction,
  setTaskTitle,
} from 'store/editTask/thunk';
import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';
import { fetchTaskAction } from 'store/common/task/thunk';

const initialState: IEditTaskReducer = {
  modalVisible: false,
  data: null,
  editLoading: {
    task: false,
    title: false,
    desc: false,
    members: false,
    status: false,
  },
  selectedMembers: null,
  unselectedMembers: null,
  editError: {
    task: null,
    title: null,
    desc: null,
    setMembers: null,
    delMembers: null,
    status: null,
  },
};

export const editTaskSlice = createSlice({
  name: EDIT_TASK_SLICE_ALIAS,
  initialState,
  reducers: {
    clearEditDataTask: () => initialState,

    setModalVisible: (
      state: IEditTaskReducer,
      action: PayloadAction<boolean>,
    ) => {
      state.modalVisible = action.payload;
    },

    setNewSelectedMembers: (
      state: IEditTaskReducer,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedMembers = action.payload;
    },
    setUnselectedMembers: (
      state: IEditTaskReducer,
      action: PayloadAction<string[]>,
    ) => {
      state.unselectedMembers = action.payload;
    },
  },
  extraReducers: {
    [fetchTaskAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.task = true;
      state.editError.task = null;
    },
    [fetchTaskAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.task = false;
    },
    [fetchTaskAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.data = initialState.data;
      state.editLoading.task = false;
      state.editError.task = payload;
    },

    [setTaskDescription.pending.type]: (state: IEditTaskReducer) => {
      state.editError.desc = null;
      state.editLoading.desc = true;
    },
    [setTaskDescription.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.desc = false;
    },
    [setTaskDescription.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editLoading.desc = false;
      state.editError.desc = payload;
    },

    [setTaskTitle.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.title = true;
      state.editError.title = null;
    },
    [setTaskTitle.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.title = false;
    },
    [setTaskTitle.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editLoading.title = false;
      state.editError.title = payload;
    },

    [setTaskMemberAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.members = true;
      state.editError.setMembers = null;
    },
    [setTaskMemberAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.members = false;
    },
    [setTaskMemberAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.setMembers = payload;
      state.selectedMembers = null;
      state.editLoading.members = false;
    },

    [deleteTaskMemberAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.members = true;
      state.editError.delMembers = null;
    },
    [deleteTaskMemberAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.members = false;
    },
    [deleteTaskMemberAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.delMembers = payload;
      state.unselectedMembers = null;
      state.editLoading.members = false;
    },
    [changeEditTaskStatusAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.status = true;
      state.editError.status = null;
    },
    [changeEditTaskStatusAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.status = false;
    },
    [changeEditTaskStatusAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      // state.response = null;
      state.editLoading.status = false;
      state.editError.status = payload;
    },
  },
});

export const {
  clearEditDataTask,
  setNewSelectedMembers,
  setUnselectedMembers,
  setModalVisible,
} = editTaskSlice.actions;
export default editTaskSlice.reducer;
