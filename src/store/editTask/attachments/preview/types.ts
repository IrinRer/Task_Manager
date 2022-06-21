export const PREVIEW_SLICE_ALIAS = 'preview';

export interface IPreviewReducer {
  previewTitleRender: string;
  previewTitleReceived: string;
  imgRecieved: Array<IPayloadImgReceived>;
  index: number;
  loading: boolean;
}

export interface IPayloadImgReceived {
  name: string;
  url?: string;
}
