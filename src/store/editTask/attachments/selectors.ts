import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/index';

export const isClickedAttachments = (state: RootState) =>
  state.editTask.attachments.attachmentsReducer.isClicked;

export const attachmentsData = (state: RootState) =>
  state.editTask.attachments.attachmentsReducer.data;

export const getStorageFile = createSelector(attachmentsData, (attachments) =>
  attachments.map(({ name_original, storage_file_id }) => {
    return {
      name: name_original,
      storageId: storage_file_id,
    };
  }),
);

export const getFileName = (state: RootState) =>
  state.editTask.attachments.attachmentsReducer.data?.map(
    ({ name_original: name }) => name,
  );

export const getViewFileImg = (state: RootState) =>
  state.editTask.attachments.attachmentsReducer.viewFileImg;

export const taskFile = (state: RootState) =>
  state.editTask.attachments.attachmentsReducer.dataReceived;

export const getTaskFileImg = createSelector(taskFile, (file) =>
  file?.filter(({ type }) => type === 'image'),
);

export const getTaskFileAllType = createSelector(taskFile, (file) =>
  file?.filter(({ type }) => type !== 'image'),
);
