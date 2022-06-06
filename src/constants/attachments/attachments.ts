import { RcFile } from 'antd/lib/upload';
import { UploadFileStatus } from 'antd/lib/upload/interface';
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

export interface IOptions extends UploadRequestOption {
  file: string | RcFile | Blob;
  onError?: ((event: ProgressEvent<EventTarget>) => void) | undefined;
  onProgress: (event: UploadProgressEvent) => void;
  onSuccess?: ((xhr?: XMLHttpRequest | undefined) => void) | undefined;
}

export interface IItemFile {
  uid: string,
  name: string,
  originFileObj: {name: string} | RcFile | undefined,
  size: number,
  type: string,
  storageId: string,
  response: 'Ok' | string,
  status: 'done' | UploadFileStatus,
}

export const COLOR_PROGRESS = '#0062ff';

export const ACCEPT_FORMAT = ".doc,.png,.jpg,.jpeg,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf";

export const PROGRESS = {
  strokeWidth: 5,
  showInfo: false,
  strokeColor: {
    '0%': COLOR_PROGRESS,
    '100%': COLOR_PROGRESS,
  },
  style: { top: 10, borderRadius: 8 },
};

