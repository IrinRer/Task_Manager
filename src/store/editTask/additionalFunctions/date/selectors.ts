import { RootState } from 'store';
import { format } from 'date-fns';
import { DATE_FORMAT_UI } from 'constants/common';

export const getDateStart = (state: RootState) =>
  state.editTask.additionalFunctions.date.dateStart;
export const getDateStop = (state: RootState) =>
  state.editTask.additionalFunctions.date.dateStop
    ? format(
        new Date(state.editTask.additionalFunctions.date.dateStop),
        DATE_FORMAT_UI,
      )
    : undefined;
export const getDateLoading = (state: RootState) =>
  state.editTask.additionalFunctions.date.loading;
export const getDateError = (state: RootState) =>
  state.editTask.additionalFunctions.date.error;

export const getInfoDate = (state: RootState) =>
state.editTask.additionalFunctions.date;

