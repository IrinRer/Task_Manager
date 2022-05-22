import { AxiosRequestConfig, AxiosError } from 'axios';
import { RcFile } from 'antd/lib/upload';

export const ATTACHMENTS_SLICE_ALIAS = 'attachments';

export interface IAttachmentsReducer {
  data: any,
  isClicked: boolean,
  loading: boolean,
  error: AxiosError | null,
}

export interface IFileThunk {
  config: AxiosRequestConfig<FormData>;
  fileList: RcFile;
  // не удается типизировать onSuccess, onError
  onSuccess;
  onError;
}

export interface IPayloadFile {
  content_type: string,
  image_height: string,
  image_thumbnail: string | null,
  image_width: string,
  name_original: string,
  size: number,
  storage_file_id: string,
  type: string,
  uploaded: boolean
}