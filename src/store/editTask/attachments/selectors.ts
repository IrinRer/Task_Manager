import { RootState } from 'store/index';

export const isClickedAttachments = (state: RootState) =>
  state.editTask.attachments.isClicked;

export const getStorageFile = (state: RootState) =>
  state.editTask.attachments.data?.map(
    ({ name_original, storage_file_id }) => {
      return {
        name: name_original,
        storageId: storage_file_id,
      };
    },
  );

export const getfileName = (state: RootState) =>
  state.editTask.attachments.data?.map(
    ({ name_original: name }) => name,
  );
