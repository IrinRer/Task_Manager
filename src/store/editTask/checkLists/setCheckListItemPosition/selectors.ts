import { RootState } from 'store';

export const getDraggedItemId = (state: RootState) =>
  state.editTask.checkLists.setCheckListItemPosition.draggedItemId;
