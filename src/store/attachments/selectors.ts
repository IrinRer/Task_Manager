import { RootState } from 'store/index';

export const isClickedAttachments = (state: RootState) =>
  state.attachments.isClicked;

export const getStorageFileId = (state: RootState) =>
  state.attachments.data?.storage_file_id;
