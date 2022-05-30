import { RootState } from 'store';

export const getDateStart = (state: RootState) =>
  state.editTask.additionalFunctions.date.dateStart;
export const getDateStop = (state: RootState) =>
  state.editTask.additionalFunctions.date.dateStop;
export const getDateLoading = (state: RootState) =>
  state.editTask.additionalFunctions.date.loading;
export const getDateError = (state: RootState) =>
  state.editTask.additionalFunctions.date.error;
