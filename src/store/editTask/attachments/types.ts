import { AxiosRequestConfig, AxiosError } from 'axios';
import { IFileList } from 'constants/attachments/attachments';

export const ATTACHMENTS_SLICE_ALIAS = 'attachments';

export interface IAttachmentsReducer {
  data: IPayloadFile[];
  viewFileImg: Array<{name: string; url:string}>;
  viewFileDoc: any,
  isClicked: boolean;
  loading: boolean;
  error: AxiosError | null;
}

export interface IFileThunk {
  configProgressBar?: AxiosRequestConfig<FormData>;
  fileList?: IFileList | undefined;
  taskId?: string | undefined;

  // не удается типизировать onSuccess, onError
  onSuccess?: any;
  onError?: any;
  fileId?: string;
  name?: string | undefined;
}

export interface IPayloadFile {
  content_type: string;
  image_height: string;
  image_width: string;
  name_original: string;
  size: number;
  storage_file_id: string;
  type: string;
  uploaded: boolean;
}
