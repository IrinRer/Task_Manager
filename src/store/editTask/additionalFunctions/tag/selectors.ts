import { RootState } from 'store';

export const getTag = (state: RootState) =>
  state.editTask.additionalFunctions.tags.sentTag;

export const uniqueTagNameSelector = (state: RootState) =>
  state.editTask.additionalFunctions.tags.sentTag?.map(({ name }) => name);
