import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectSearchQueryValue = (state: RootState) =>
  state.filters.searchQuery;

export const selectStatusCheckboxesValues = (state: RootState) =>
  state.filters.statuses;

export const selectPriorityCheckboxesValues = (state: RootState) =>
  state.filters.priorities;

export const selectAttachmentCheckboxValue = (state: RootState) =>
  state.filters.attachments;

export const selectProgressValue = (state: RootState) => state.filters.progress;

export const selectFilterTags = (state: RootState) => state.filters.tags;

export const selectFilterTagsNames = createSelector(
  selectFilterTags,
  (tags) => {
    return tags.map((tag) => tag.name);
  },
);

export const selectFilterUsers = (state: RootState) => state.filters.users;

export const selectFilterUsersNames = createSelector(
  selectFilterUsers,
  (users) => {
    return users.map((user) => user.name);
  },
);

export const selectTaskQuery = (state: RootState) => state.filters;
