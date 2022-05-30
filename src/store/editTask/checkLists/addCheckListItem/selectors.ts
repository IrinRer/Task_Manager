import { RootState } from 'store';

export const isAddCheckListItemLoading = (state: RootState) =>
  state.editTask.checkLists.addCheckListItem.isLoading;

export const addCheckListItemError = (state: RootState) =>
  state.editTask.checkLists.addCheckListItem.error;
