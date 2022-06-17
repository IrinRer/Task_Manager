import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getTag = (state: RootState) =>
  state.editTask.additionalFunctions.tags.tagReducer.sentTag;

export const tagNameSelector = (state: RootState) =>
  state.editTask.additionalFunctions.tags.tagReducer.sentTag;

export const uniqueTagNameSelector = createSelector(
  tagNameSelector,
  (tagName) => tagName?.map(({ name }) => name),
);
