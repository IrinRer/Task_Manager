import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/index';

export const isClickedAttachments = (state: RootState) =>
  state.editTask.attachments.isClicked;

export const attachmentsData = (state: RootState) =>
  state.editTask.attachments.data;

export const getStorageFile = createSelector(attachmentsData, (attachments) =>
  attachments.map(({ name_original, storage_file_id }) => {
    return {
      name: name_original,
      storageId: storage_file_id,
    };
  }),
);

export const getfileName = (state: RootState) =>
  state.editTask.attachments.data?.map(({ name_original: name }) => name);
