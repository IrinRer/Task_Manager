import { RootState } from 'store/';

export const getPreviewImageRender = (state: RootState) =>
  state.editTask.attachments.preview.previewImageRender;

export const getPreviewTitleRender = (state: RootState) =>
  state.editTask.attachments.preview.previewTitleRender;

export const getPreviewVisibleReceived = (state: RootState) =>
  state.editTask.attachments.preview.previewVisibleReceived;

export const getPreviewImageReceived = (state: RootState) =>
  state.editTask.attachments.preview.previewImageReceived;

export const getPreviewTitleReceived = (state: RootState) =>
  state.editTask.attachments.preview.previewTitleReceived;

