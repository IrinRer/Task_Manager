import { RootState } from 'store';

export const isModalVisibleMain = (state: RootState) =>
  state.editTask.additionalFunctions.tags.modalVisible.isModalVisibleMain;
export const isModalVisibleCreate = (state: RootState) =>
  state.editTask.additionalFunctions.tags.modalVisible.isModalVisibleCreate;
export const isModalVisibleEdit = (state: RootState) =>
  state.editTask.additionalFunctions.tags.modalVisible.isModalVisibleEdit;
export const isModalVisibleDelete = (state: RootState) =>
  state.editTask.additionalFunctions.tags.modalVisible.isModalVisibleDelete;
