import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectSearchQueryValue = (state: RootState) =>
  state.filters.currentState.searchQuery;

export const selectStatusCheckboxesValues = (state: RootState) =>
  state.filters.currentState.statuses;

export const selectPriorityCheckboxesValues = (state: RootState) =>
  state.filters.currentState.priorities;

export const selectAttachmentCheckboxValue = (state: RootState) =>
  state.filters.currentState.attachments;

export const selectProgressValue = (state: RootState) =>
  state.filters.currentState.progress;

export const selectFilterTags = (state: RootState) =>
  state.filters.currentState.tags;

export const selectFilterTagsNames = createSelector(
  selectFilterTags,
  (tags) => {
    return tags.map((tag) => tag.name);
  },
);

export const selectFilterUsers = (state: RootState) =>
  state.filters.currentState.users;

export const selectFilterUsersNames = createSelector(
  selectFilterUsers,
  (users) => {
    return users.map((user) => user.name);
  },
);

export const selectTaskQuery = (state: RootState) => state.filters.currentState;

export const selectUsersInputValue = (state: RootState) =>
  state.filters.currentState.usersInputValue;

export const selectTagsInputValue = (state: RootState) =>
  state.filters.currentState.tagsInputValue;
