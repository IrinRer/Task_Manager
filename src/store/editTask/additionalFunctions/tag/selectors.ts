import { RootState } from 'store';

export const getTag = (state: RootState) =>
  state.editTask.additionalFunctions.tags.tagReducer.sentTag;

export const uniqueTagNameSelector = (state: RootState) =>
  state.editTask.additionalFunctions.tags.tagReducer.sentTag?.map(
    ({ name }) => name,
  );
