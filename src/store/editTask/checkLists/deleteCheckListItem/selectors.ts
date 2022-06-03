import { RootState } from 'store';

export const isDeleteCheckListItemLoading = (state: RootState) =>
  state.editTask.checkLists.deleteCheckListItem.isLoading;

export const deleteCheckListError = (state: RootState) =>
  state.editTask.checkLists.deleteCheckListItem.error;
