import { RootState } from 'store';

export const isDeleteCheckListLoading = (state: RootState) =>
  state.editTask.checkLists.deleteCheckList.isLoading;

export const deleteCheckListError = (state: RootState) =>
  state.editTask.checkLists.deleteCheckList.error;
