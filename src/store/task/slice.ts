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
  response: null,
  prevData: null,
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

  data: {
    task_id: '',
    title: '',
    description: '',
    status: { task_status_id: '', name: '' },
    roles: [
      {
        task_to_role_id: '',
        task: {
          task_id: '',
        },
        task_role: {
          task_role_id: '',
          name: '',
          name_group: '',
          max_user_assigned: 1,
          is_author: true,
          created: new Date(3600 * 24 * 1000),
          updated: new Date(3600 * 24 * 1000),
        },
        assign_user: {
          user_id: '',
          name: '',
          logo: '',
          permissions: [],
        },
      },
    ],
  },
};

export const onetaskSlice = createSlice({
  // Название должно быть уникальным!
  name: ONETASK_SLICE_ALIAS,
  initialState,
  reducers: {
    clearDataTask: (state: ITaskReducer) => {
      state.data = initialState.data;
      state.response = initialState.response;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
    setTitle: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    setDescription: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    setNewSelectedMembers: (
      state: ITaskReducer,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedMembers = action.payload;
    },
    setUnselectedMembers: (
      state: ITaskReducer,
      action: PayloadAction<string[]>,
    ) => {
      state.unselectedMembers = action.payload;
    },
    /* createStatusId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.status.task_status_id = action.payload;
    }, */
    /* setTaskId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.task_id = action.payload;
    }, */
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
      state.prevData = payload;
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

    /* [createTaskAction.pending.type]: (state: ITaskReducer) => {
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
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.createdTask = null;
      state.loading = false;
      state.error = payload;
    }, */

    [setTaskDescription.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error.desc = null;
    },
    [setTaskDescription.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [setTaskDescription.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) =>
      // eslint-disable-next-line sonarjs/no-identical-functions
      {
        state.response = null;
        state.loading = false;
        state.error.desc = payload;
        state.data.description =
          state.prevData?.description || initialState.data.description;
      },

    [setTaskTitle.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error.title = null;
    },
    [setTaskTitle.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [setTaskTitle.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) =>
      // eslint-disable-next-line sonarjs/no-identical-functions
      {
        state.response = null;
        state.loading = false;
        state.error.title = payload;
        state.data.title = state.prevData?.title || initialState.data.title;
      },

    [setTaskMemberAction.pending.type]: (state: ITaskReducer) => {
      state.error.setMembers = null;
    },
    [setTaskMemberAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response = payload;
      state.data.roles = payload.roles;
    },
    [setTaskMemberAction.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.response = null;
      state.error.setMembers = payload;
      state.selectedMembers = null;
    },

    [deleteTaskMemberAction.pending.type]: (state: ITaskReducer) => {
      state.error.delMembers = null;
    },
    [deleteTaskMemberAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<IResponseTask>,
    ) =>
      // eslint-disable-next-line sonarjs/no-identical-functions
      {
        state.response = payload;
        state.data.roles = payload.roles;
      },
    [deleteTaskMemberAction.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    ) =>
      // eslint-disable-next-line sonarjs/no-identical-functions
      {
        state.response = null;
        state.error.delMembers = payload;
        state.unselectedMembers = null;
      },
  },
});

export const {
  clearDataTask,
  setTitle,
  setDescription,
  setNewSelectedMembers,
  setUnselectedMembers,
} = onetaskSlice.actions;
export default onetaskSlice.reducer;
