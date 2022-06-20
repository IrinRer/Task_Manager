import { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';
/* eslint-disable import/no-extraneous-dependencies */
import {
  UploadProgressEvent,
  UploadRequestOption,
} from 'rc-upload/lib/interface';

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
  uid: string;
  name: string;
  originFileObj: { name: string } | RcFile | undefined;
  size: number;
  type: string;
  storageId: string;
  response: 'Ok' | string;
  status: 'done' | UploadFileStatus;
}

export const COLOR_PROGRESS = '#0062ff';

export interface IType {
  name: string;
  url?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  originFileObj?: RcFile;
  percent?: number;
  response?: string;
  size?: number;
  status?: undefined;
  thumbUrl?: string;
  type?: string;
  uid?: string;
  xhr?: undefined;
}

export const ACCEPT_FORMAT =
  '.doc,.png,.jpg,.jpeg,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf';

export const SETTINGS = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
