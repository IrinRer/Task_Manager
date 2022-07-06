import { RootState } from 'store';

export const isSetCheckListTitleLoading = (state: RootState) =>
  state.editTask.checkLists.setCheckListTitle.isLoading;

export const setCheckListTitleError = (state: RootState) =>
  state.editTask.checkLists.setCheckListTitle.error;
