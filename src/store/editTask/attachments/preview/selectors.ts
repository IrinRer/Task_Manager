import { RootState } from 'store/';

export const getPreviewTitleRender = (state: RootState) =>
  state.editTask.attachments.preview.previewTitleRender;

export const getPreviewTitleReceived = (state: RootState) =>
  state.editTask.attachments.preview.previewTitleReceived;

// export const getFileRender = (state: RootState) =>
//   state.editTask.attachments.preview.fileRender;

export const getImgReceived = (state: RootState) =>
  state.editTask.attachments.preview.imgRecieved;

export const getIndex = (state: RootState) =>
  state.editTask.attachments.preview.index;

export const getHover = (state: RootState) =>
  state.editTask.attachments.preview.hover;
