import { RcFile } from 'antd/lib/upload';
/* eslint-disable import/no-extraneous-dependencies */
import { UploadProgressEvent, UploadRequestOption } from 'rc-upload/lib/interface';

export interface IFileList extends Blob, RcFile {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  originFileObj?: RcFile;
  percent?: number;
  response?: string;
  size: number;
  status?: undefined;
  thumbUrl?: string;
  type: string;
  uid: string;
  xhr?: undefined;
}

export interface IOptions extends UploadRequestOption{
  file: string | RcFile | Blob;
  onError?: ((event: ProgressEvent<EventTarget>) => void) | undefined;
  onProgress: (event: UploadProgressEvent) => void;
  onSuccess?: ((xhr?: XMLHttpRequest | undefined) => void) | undefined;
}

export interface IItemFile {
      uid: string,
      name: string,
      originFileObj: { name: string },
      size: number,
      type: string,
      thumbUrl: string | null,
      storageId: string,
      response: 'Ok',
      status: 'done',
}

export const colorProgress = '#0062ff';

export const acceptFormat = ".doc,.png,.jpg,.jpeg,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"; 

export const progress = {
  strokeWidth: 5,
  strokeColor: {
    '0%': colorProgress,
    '100%': colorProgress,
  },
  style: { top: 10, borderRadius: 8 },
};

