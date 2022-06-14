export const PREVIEW_SLICE_ALIAS = 'preview';

export interface IPreviewReducer {
  previewImageRender: string | undefined;
  previewTitleRender: string;

  previewVisibleReceived: boolean;
  previewImageReceived: string | undefined;
  previewTitleReceived: string;
}
