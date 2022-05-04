import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FILTERS_SLICE_ALIAS, IFiltersReducer } from 'store/filters/types';
import { TProgressValue } from 'store/common/progresses/types';
import { IUser } from '../users/types';
import { ITag } from '../common/tags/types';

const initialState: IFiltersReducer = {
  searchQuery: null,
  users: [],
  statuses: [],
  tags: [],
  attachments: false,
  progress: 0,
  priorities: [],
  usersInputValue: '',
  tagsInputValue: '',
};

export const filtersSlice = createSlice({
  name: FILTERS_SLICE_ALIAS,
  initialState,
  reducers: {
    searchUpdated: (state: IFiltersReducer, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    usersUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<IUser>>,
    ) => {
      state.users = action.payload.filter((user) => user.user_id);
    },
    userRemoved: (state: IFiltersReducer, action: PayloadAction<IUser>) => {
      state.users = state.users.filter(
        (user) => user.user_id !== action.payload.user_id,
      );
    },
    usersInputValueUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<string>,
    ) => {
      state.usersInputValue = action.payload;
    },
    tagsUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<ITag>>,
    ) => {
      state.tags = action.payload.filter((tag) => tag.task_tag_id);
    },
    tagRemoved: (state: IFiltersReducer, action: PayloadAction<ITag>) => {
      state.tags = state.tags.filter(
        (tag) => tag.task_tag_id !== action.payload.task_tag_id,
      );
    },
    tagsInputValueUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<string>,
    ) => {
      state.tagsInputValue = action.payload;
    },
    statusesUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<string>>,
    ) => {
      state.statuses = action.payload;
    },
    attachmentsUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<boolean>,
    ) => {
      state.attachments = action.payload;
    },
    progressUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<TProgressValue>,
    ) => {
      state.progress = action.payload;
    },
    priorityUpdated: (
      state: IFiltersReducer,
      action: PayloadAction<Array<string>>,
    ) => {
      state.priorities = action.payload;
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
} = filtersSlice.actions;
