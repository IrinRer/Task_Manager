import { UploadFile } from 'antd/lib/upload/interface';

export const PREVIEW_SLICE_ALIAS = 'preview';

export interface IPreviewReducer {
  previewImageRender: string | undefined;
  previewTitleRender: string;

  previewImageReceived: string | undefined;
  previewTitleReceived: string;

  fileList: Array<UploadFile>;
}
