import { RootState } from 'store';

export const isAddCheckListLoading = (state: RootState) =>
  state.editTask.checkLists.addCheckList.isLoading;

export const addCheckListError = (state: RootState) =>
  state.editTask.checkLists.addCheckList.error;
