import { UploadFile } from 'antd/lib/upload/interface';

export const PREVIEW_SLICE_ALIAS = 'preview';

export interface IPreviewReducer {
  // previewImageRender: string | undefined;
  previewTitleRender: string;

  // previewImageReceived: string | undefined;
  previewTitleReceived: string;

  // fileRender: Array<UploadFile>;
  imgRecieved: Array<IPayloadImgReceived>;

  index: number;
  hover: boolean;
}

export interface IPayloadImgReceived {
  name: string;
  url?: string;
}
