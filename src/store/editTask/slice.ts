import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IEditTaskReducer, EDIT_TASK_SLICE_ALIAS } from 'store/editTask/types';
import {
  addCheckListAction,
  addCheckListItemAction,
  deleteCheckListAction,
  deleteCheckListItemAction,
  deleteTaskMemberAction,
  setCheckListTitle,
  setCompleteCheckListItemAction,
  setTaskDescription,
  setTaskMemberAction,
  setTaskTitle,
} from 'store/editTask/thunk';
import { AxiosError } from 'axios';
import {
  ICheckList,
  ICheckListItem,
  IResponseTask,
} from 'store/common/task/types';
import { fetchTaskAction } from 'store/common/task/thunk';

const initialState: IEditTaskReducer = {
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

    [deleteCheckListAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.checkList = true;
    },
    [deleteCheckListAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.checkList = false;
    },
    [deleteCheckListAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkList = payload;
      state.editLoading.checkList = false;
    },

    [addCheckListAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.checkList = true;
    },
    [addCheckListAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.data = payload;
      state.editLoading.checkList = false;
    },
    [addCheckListAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkList = payload;
      state.editLoading.checkList = false;
    },

    [addCheckListItemAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.checkListItem = true;
    },
    [addCheckListItemAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<ICheckListItem>,
    ) => {
      state.data?.check_lists[0].items.push(payload);
      state.editLoading.checkListItem = false;
    },
    [addCheckListItemAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkListItem = payload;
      state.editLoading.checkListItem = false;
    },

    [deleteCheckListItemAction.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.checkListItem = true;
    },
    [deleteCheckListItemAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<ICheckListItem>,
    ) => {
      state.data!.check_lists[0].items =
        state.data!.check_lists[0].items.filter(
          (item) => item.check_list_item_id !== payload.check_list_item_id,
        );
      state.editLoading.checkListItem = false;
    },
    [deleteCheckListItemAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkListItem = payload;
      state.editLoading.checkListItem = false;
    },

    [setCompleteCheckListItemAction.pending.type]: (
      state: IEditTaskReducer,
    ) => {
      state.editLoading.checkListItem = true;
    },
    [setCompleteCheckListItemAction.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<ICheckListItem>,
    ) => {
      const checkListItemIndex: number =
        state.data!.check_lists[0].items.findIndex(
          (item) => item.check_list_item_id === payload.check_list_item_id,
        );

      state.data!.check_lists[0].items[checkListItemIndex] = payload;

      state.editLoading.checkListItem = false;
    },
    [setCompleteCheckListItemAction.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkListItem = payload;
      state.editLoading.checkListItem = false;
    },

    [setCheckListTitle.pending.type]: (state: IEditTaskReducer) => {
      state.editLoading.checkListTitle = true;
    },
    [setCheckListTitle.fulfilled.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<ICheckList>,
    ) => {
      state.data!.check_lists[0].title = payload.title;
      state.data!.check_lists[0].updated = payload.updated;

      state.editLoading.checkListTitle = false;
    },
    [setCheckListTitle.rejected.type]: (
      state: IEditTaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.editError.checkListTitle = payload;
      state.editLoading.checkListTitle = false;
    },
  },
});

export const {
  clearEditDataTask,
  setNewSelectedMembers,
  setUnselectedMembers,
} = editTaskSlice.actions;
export default editTaskSlice.reducer;
