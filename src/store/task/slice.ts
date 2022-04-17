import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITaskReducer, ONETASK_SLICE_ALIAS } from 'store/task/types';
import { createTaskAction, deleteTaskWatchersAction, fetchAllMembers, fetchAllRoles, fetchAllStatuses, fetchTaskAction, setTaskDescription, setTaskTitle, setTaskWatchersAction} from 'store/task/thunk';

const initialState: ITaskReducer = {
  response: null,
  createdTask: null,
  changeWatchers: null,
  loading: false,
  error: null,
  statuses: null,
  allroles: null,
  members: null,
  selectedMembers: null,
  unselectedMembers: null,

  data: {
    task_id: "", 
    title: "", 
    description: "", 
    status: {task_status_id:"", name:""},
    roles: [
      {
      task_to_role_id: "",
      task: {
        task_id: ""
      },
      task_role: {
        task_role_id: "",
        name: "",
        name_group: "",
        max_user_assigned: 1,
        is_author: true,
        created: new Date(3600 * 24 * 1000),
        updated: new Date(3600 * 24 * 1000)
      },
      assign_user: {
        user_id: "",
        name: "",
        logo: ""
      }}
    ],
    watchers: [{task_id: "", assign_user_id: "", task_role_id:""}],
  },
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
    setDescription: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.description = action.payload;
    },
    createStatusId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.status.task_status_id = action.payload;
    },
    setTaskId: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.task_id = action.payload;
    },
    setNewSelectedMembers: (state: ITaskReducer, action: PayloadAction<any>) => {
      state.selectedMembers = action.payload;
    },
    setUnselectedMembers: (state: ITaskReducer, action: PayloadAction<any>) => {
      state.unselectedMembers = action.payload;
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
      state.data = payload;
      state.loading = false;
    },
    [fetchTaskAction.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.data = initialState.data;
      state.loading = false;
      state.error = payload;
    },


    [setTaskWatchersAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [setTaskWatchersAction.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.changeWatchers = payload;
      state.loading = false;
    },
    [setTaskWatchersAction.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.changeWatchers = null;
      state.loading = false;
      state.error = payload;
    },



    [deleteTaskWatchersAction.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTaskWatchersAction.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [deleteTaskWatchersAction.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    // eslint-disable-next-line sonarjs/no-identical-functions
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


    [setTaskDescription.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [setTaskDescription.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [setTaskDescription.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },


    [setTaskTitle.pending.type]: (state: ITaskReducer) => {
      state.loading = true;
      state.error = null;
    },
    [setTaskTitle.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [setTaskTitle.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.response = null;
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


    [fetchAllMembers.pending.type]: (state: ITaskReducer) => {
      state.error = null;
    },
    [fetchAllMembers.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.members = payload;
    },
    [fetchAllMembers.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.members = initialState.members;
      state.error = payload;
    },


    [fetchAllRoles.pending.type]: (state: ITaskReducer) => {
      state.error = null;
    },
    [fetchAllRoles.fulfilled.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.allroles = payload;
    },
    [fetchAllRoles.rejected.type]: (
      state: ITaskReducer,
      // TODO: Добавить типизацию
      { payload }: PayloadAction<any>,
    ) => {
      state.allroles = initialState.allroles;
      state.error = payload;
    },


  },
});

export const { setNewSelectedMembers, setUnselectedMembers, setTaskId, clearDataTask, createTitle, setDescription,  createStatusId } = onetaskSlice.actions;
export default onetaskSlice.reducer;