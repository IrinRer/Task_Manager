import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEditTaskReducer, EDIT_TASK_SLICE_ALIAS } from 'store/editTask/types';
import { AxiosError } from 'axios';
import { IResponseTask } from 'store/common/task/types';
import { fetchTaskAction } from 'store/common/task/thunk';
import { setCompleteCheckListItemsActionExtraReducers } from './thunks/checkLists/setCompleteCheckListItemAction';
import { setCheckListTitleActionExtraReducers } from './thunks/checkLists/setCheckListTitleAction';
import { deleteCheckListItemActionExtraReducers } from './thunks/checkLists/deleteCheckListItemAction';
import { addCheckListItemActionExtraReducers } from './thunks/checkLists/addCheckListItemAction';
import { addCheckListActionExtraReducers } from './thunks/checkLists/addCheckListAction';
import { deleteCheckListActionExtraReducers } from './thunks/checkLists/deleteCheckListAction';
import { setTaskDescriptionExtraReducers } from './thunks/setTaskDescription';
import { setTaskTitleExtraReducers } from './thunks/setTaskTitle';
import { setTaskMemberActionExtraReducers } from './thunks/setTaskMemberAction';
import { deleteTaskMemberActionExtraReducers } from './thunks/deleteTaskMemberAction';

const initialState: IEditTaskReducer = {
  modalVisible: false,
  data: null,
  editLoading: {
    task: false,
    title: false,
    desc: false,
    members: false,
    checkList: false,
    checkListTitle: false,
    checkListItem: false,
  },
  selectedMembers: null,
  unselectedMembers: null,
  editError: {
    task: null,
    title: null,
    desc: null,
    setMembers: null,
    delMembers: null,
    checkList: null,
    checkListTitle: null,
    checkListItem: null,
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

    ...setTaskDescriptionExtraReducers,
    ...setTaskTitleExtraReducers,
    ...setTaskMemberActionExtraReducers,
    ...deleteTaskMemberActionExtraReducers,
    ...deleteCheckListActionExtraReducers,
    ...addCheckListActionExtraReducers,
    ...addCheckListItemActionExtraReducers,
    ...deleteCheckListItemActionExtraReducers,
    ...setCompleteCheckListItemsActionExtraReducers,
    ...setCheckListTitleActionExtraReducers,
  },
});

export const {
  clearEditDataTask,
  setNewSelectedMembers,
  setUnselectedMembers,
  setModalVisible,
} = editTaskSlice.actions;

export default editTaskSlice.reducer;
