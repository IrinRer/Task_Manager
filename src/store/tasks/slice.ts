import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  ITasksReducer,
  ITasksResponse,
  TASKS_SLICE_ALIAS,
  TsetTasksOnPagePayload,
  TsetPagePayload,
  TsetSortFieldPayload,
} from 'store/tasks/types';
import {
  changeTaskStatusAction,
  deleteTaskAction,
  fetchTasksAction,
} from 'store/tasks/thunk';
import { SortField, TTask } from 'constants/types/common';

const TASKS_ON_PAGE_DEFAULT = 3;

const initialState: ITasksReducer = {
  tasks: [],
  itemsTotal: 0,
  loading: false,
  // auth временное свойство, необходимое на данном этапе для корректной работы роута
  auth: true,
  error: null,
  onlyMyTasks: false,
  viewParameters: {
    in: {
      sortField: SortField.endDate,
      page: 1,
      tasksOnPage: TASKS_ON_PAGE_DEFAULT,
    },
    work: {
      sortField: SortField.endDate,
      page: 1,
      tasksOnPage: TASKS_ON_PAGE_DEFAULT,
    },
    done: {
      sortField: SortField.endDate,
      page: 1,
      tasksOnPage: TASKS_ON_PAGE_DEFAULT,
    },
  },
};

export const tasksSlice = createSlice({
  // Название должно быть уникальным!
  name: TASKS_SLICE_ALIAS,
  initialState,
  reducers: {
    showOnlyMyTasks: (state: ITasksReducer) => {
      state.onlyMyTasks = true;
    },
    showAllTasks: (state: ITasksReducer) => {
      state.onlyMyTasks = false;
    },
    setSortField: (
      state: ITasksReducer,
      action: PayloadAction<TsetSortFieldPayload>,
    ) => {
      state.viewParameters[action.payload.blockType].sortField =
        action.payload.sortField;
    },
    setPage: (state: ITasksReducer, action: PayloadAction<TsetPagePayload>) => {
      state.viewParameters[action.payload.blockType].page = action.payload.page;
    },
    resetPages: (state: ITasksReducer) => {
      Object.keys(state.viewParameters).forEach((key) => {
        state.viewParameters[key].page = 1;
      });
    },
    setTasksOnPage: (
      state: ITasksReducer,
      action: PayloadAction<TsetTasksOnPagePayload>,
    ) => {
      state.viewParameters[action.payload.blockType].tasksOnPage =
        action.payload.tasksOnPage;
    },
    addTask: (state: ITasksReducer, action: PayloadAction<TTask>) => {
      state.tasks?.push(action.payload);
    },
  },
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
      state.error = null;
    },
    [fetchTasksAction.rejected.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.tasks = [];
      state.loading = false;
      state.error = payload;
    },
    [changeTaskStatusAction.pending.type]: (state: ITasksReducer) => {
      state.loading = true;
      state.error = null;
    },
    [changeTaskStatusAction.fulfilled.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<TTask>,
    ) => {
      state.tasks?.forEach((task) => {
        if (task.task_id === payload.task_id) {
          task.status = payload.status;
        }
      });
      state.loading = false;
    },
    [changeTaskStatusAction.rejected.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      // state.response = null;
      state.loading = false;
      state.error = payload;
    },
    [deleteTaskAction.pending.type]: (state: ITasksReducer) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTaskAction.fulfilled.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<TTask>,
    ) => {
      state.tasks = state.tasks.filter(
        (task) => task.task_id !== payload.task_id,
      );
      state.loading = false;
    },
    [deleteTaskAction.rejected.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  showOnlyMyTasks,
  showAllTasks,
  setSortField,
  setPage,
  setTasksOnPage,
  addTask,
  resetPages,
} = tasksSlice.actions;
export default tasksSlice.reducer;
