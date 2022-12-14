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
import { SortField } from 'constants/types/common';
import { IResponseTask } from 'store/common/task/types';

const TASKS_ON_PAGE_DEFAULT = 3;

const initialState: ITasksReducer = {
  tasks: [],
  task_id_todelete: null,
  itemsTotal: 0,
  loading: false,
  error: null,
  onlyMyTasks: false,
  isShowFilter: false,
  viewParameters: {
    in: {
      sortField: SortField.created,
      page: 1,
      tasksOnPage: TASKS_ON_PAGE_DEFAULT,
    },
    work: {
      sortField: SortField.created,
      page: 1,
      tasksOnPage: TASKS_ON_PAGE_DEFAULT,
    },
    done: {
      sortField: SortField.created,
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
    toggleFilter: (state: ITasksReducer) => {
      state.isShowFilter = !state.isShowFilter;
    },
    showOnlyMyTasks: (state: ITasksReducer) => {
      state.onlyMyTasks = true;
    },
    resetTasks: () => initialState,
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
    addTask: (state: ITasksReducer, action: PayloadAction<IResponseTask>) => {
      state.tasks?.push(action.payload);
    },
    setTaskToDelete: (
      state: ITasksReducer,
      action: PayloadAction<string | null>,
    ) => {
      state.task_id_todelete = action.payload;
    },
    changeTaskRoles: (
      state: ITasksReducer,
      action: PayloadAction<IResponseTask>,
    ) => {
      const taskIndex: number = state.tasks.findIndex(
        (item) => item.task_id === action.payload.task_id,
      );
      state.tasks[taskIndex].roles = action.payload.roles;
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
      { payload }: PayloadAction<IResponseTask>,
    ) => {
      state.tasks?.forEach((task) => {
        if (task.task_id === payload.task_id) {
          task.status = payload.status;
          task.exec_stop = payload.exec_stop;
        }
      });
      state.loading = false;
    },
    [changeTaskStatusAction.rejected.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<AxiosError>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    [deleteTaskAction.pending.type]: (state: ITasksReducer) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTaskAction.fulfilled.type]: (
      state: ITasksReducer,
      { payload }: PayloadAction<IResponseTask>,
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
  resetTasks,
  setTaskToDelete,
  toggleFilter,
  changeTaskRoles,
} = tasksSlice.actions;
export default tasksSlice.reducer;
