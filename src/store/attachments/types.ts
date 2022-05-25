import { AxiosRequestConfig, AxiosError } from 'axios';
import { IFileList } from 'constants/types/attachments/attachments';

export const ATTACHMENTS_SLICE_ALIAS = 'attachments';

export interface IAttachmentsReducer {
  data: any;
  isClicked: boolean;
  loading: boolean;
  error: AxiosError | null;
}


export interface IFileThunk  {
  config?: AxiosRequestConfig<FormData>;
  // fileList?: IFileList | undefined;
  fileList?: IFileList | undefined;
  taskId?: string | undefined;
  
  // onSuccess?: (xhr?: XMLHttpRequest) => void
  // onError?: (event: UploadRequestError | ProgressEvent) => void;

  onSuccess?: any;
  onError?: any;
  fileId?: string;
  name?: string | undefined;

}

export interface IPayloadFile {
  content_type: string;
  image_height: string;
  image_thumbnail: string | null;
  image_width: string;
  name_original: string;
  size: number;
  storage_file_id: string;
  type: string;
  uploaded: boolean;
}
