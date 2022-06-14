export const PREVIEW_SLICE_ALIAS = 'preview';

export interface IPreviewReducer {
  previewVisibleRender: boolean;
  previewImageRender: string | undefined;
  previewTitleRender: string;
  previewFileRender: any;

  previewVisibleReceived: boolean;
  previewImageReceived: string | undefined;
  previewTitleReceived: string;
  previewFileReceived: any;
}
