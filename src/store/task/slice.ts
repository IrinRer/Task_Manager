import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IResponseTask, ITaskReducer, ONETASK_SLICE_ALIAS } from 'store/task/types';
import { fetchTaskAction, setTaskDescription, setTaskTitle} from 'store/task/thunk';
import { AxiosError } from 'axios';

const initialState: ITaskReducer = {
  response: null,
  loading: false,
  error: null,

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
    setTitle: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.title = action.payload;
    },
    setDescription: (state: ITaskReducer, action: PayloadAction<string>) => {
      state.data.description = action.payload;
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
      state.error = null;
    },
    [fetchTaskAction.fulfilled.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<ITaskReducer["data"]>,
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
      state.error = payload;
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
      state.error = null;
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
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.response = payload;
      state.loading = false;
    },
    [setTaskTitle.rejected.type]: (
      state: ITaskReducer,
      { payload }: PayloadAction<AxiosError>,
    // eslint-disable-next-line sonarjs/no-identical-functions
    ) => {
      state.response = null;
      state.loading = false;
      state.error = payload;
    },

  },
});

export const { clearDataTask, setTitle, setDescription} = onetaskSlice.actions;
export default onetaskSlice.reducer;