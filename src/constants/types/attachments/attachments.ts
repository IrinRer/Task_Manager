import { RcFile } from 'antd/lib/upload';

export interface IFileList {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  originFileObj: RcFile;
  percent: number;
  response: string;
  size: number;
  status: undefined;
  thumbUrl: string;
  type: string;
  uid: string;
  xhr: undefined;
}

export interface IOptions {
  file: string | RcFile | Blob;
  onError?: ((event: ProgressEvent<EventTarget>) => void) | undefined;
  onProgress?;
  onSuccess?: ((xhr?: XMLHttpRequest | undefined) => void) | undefined;
}

export const colorProgress = '#0062ff';
