import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const getHistory = (state: RootState) => state.history.data;

export const isLoading = (state: RootState) => state.history.loading;

export const totalCount = (state: RootState) => Number(state.history.count);

export const attachmentsAll = (state: RootState) => state.history.attachments;

export const attachmentsName = (state: RootState) => state.history.name;

// export const getAttachments = createSelector(attachmentsAll, (file) =>
//   file?.filter(({ name }) => name === attachmentsName),
// );

export const getAttachments = createSelector(
  [
    (state: RootState) => state.history.attachments,
    (state: RootState) => state.history.name,
  ],
  (file, nameFile) => file?.filter(({ name }) => name === nameFile),
);

