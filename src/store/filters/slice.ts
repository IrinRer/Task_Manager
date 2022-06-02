import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  FILTERS_SLICE_ALIAS,
  IFilters,
  IFiltersReducer,
} from 'store/filters/types';
import { TProgressValue } from 'store/common/progresses/types';
import { IUser } from '../users/types';
import { ITag } from '../common/tags/types';

const initialFiltersState: IFilters = {
  searchQuery: '',
  users: [],
  statuses: [],
  tags: [],
  attachments: false,
  progress: 0,
  priorities: [],
  usersInputValue: '',
  tagsInputValue: '',
};

const initialState: IFiltersReducer = {
  currentState: initialFiltersState,
  previousState: initialFiltersState,
};

export const filtersSlice = createSlice({
  name: FILTERS_SLICE_ALIAS,
  initialState,
  reducers: {
    searchUpdated: (state: IFiltersReducer, action: PayloadAction<string>) => {
      state.currentState.searchQuery = action.payload;
    },
    usersUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<IUser>>,
    ) => {
      state.currentState.users = action.payload.filter((user) => user.user_id);
    },
    userRemoved: (state: IFiltersReducer, action: PayloadAction<IUser>) => {
      state.currentState.users = state.currentState.users.filter(
        (user) => user.user_id !== action.payload.user_id,
      );
    },
    usersInputValueUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<string>,
    ) => {
      state.currentState.usersInputValue = action.payload;
    },
    tagsUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<ITag>>,
    ) => {
      state.currentState.tags = action.payload.filter((tag) => tag.task_tag_id);
    },
    tagRemoved: (state: IFiltersReducer, action: PayloadAction<ITag>) => {
      state.currentState.tags = state.currentState.tags.filter(
        (tag) => tag.task_tag_id !== action.payload.task_tag_id,
      );
    },
    tagsInputValueUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<string>,
    ) => {
      state.currentState.tagsInputValue = action.payload;
    },
    statusesUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<string>>,
    ) => {
      state.currentState.statuses = action.payload;
    },
    attachmentsUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<boolean>,
    ) => {
      state.currentState.attachments = action.payload;
    },
    progressUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<TProgressValue>,
    ) => {
      state.currentState.progress = action.payload;
    },
    priorityUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<string>>,
    ) => {
      state.currentState.priorities = action.payload;
    },
    filtersSyncState: (state: IFiltersReducer) => {
      state.previousState = state.currentState;
    },
    filtersRollBack: (state: IFiltersReducer) => {
      state.currentState = state.previousState;
    },
    filtersCleared: () => initialState,
  },
});

export default filtersSlice.reducer;

export const {
  searchUpdated,
  usersUpdated,
  userRemoved,
  statusesUpdated,
  tagsUpdated,
  attachmentsUpdated,
  progressUpdated,
  priorityUpdated,
  tagRemoved,
  filtersCleared,
  usersInputValueUpdated,
  tagsInputValueUpdated,
  filtersRollBack,
  filtersSyncState,
} = filtersSlice.actions;
