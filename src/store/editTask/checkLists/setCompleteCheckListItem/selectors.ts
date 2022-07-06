import { RootState } from 'store';

export const isCompleteCheckListItemLoading = (state: RootState) =>
  state.editTask.checkLists.setCompleteCheckListItem.isLoading;

export const completeCheckListError = (state: RootState) =>
  state.editTask.checkLists.setCompleteCheckListItem.error;
