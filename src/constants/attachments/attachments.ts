import { RcFile } from 'antd/lib/upload';
/* eslint-disable import/no-extraneous-dependencies */
import {
  UploadProgressEvent,
  UploadRequestOption,
} from 'rc-upload/lib/interface';

export interface IFileList extends Blob, RcFile {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  size: number;
  type: string;
  uid: string;
  originFileObj?: RcFile;
  percent?: number;
  response?: string;
  status?: undefined;
  thumbUrl?: string;
  xhr?: undefined;
}

export interface IOptions extends UploadRequestOption {
  file: string | RcFile | Blob;
  onProgress: (event: UploadProgressEvent) => void;
  onError?: ((event: ProgressEvent<EventTarget>) => void) | undefined;
  onSuccess?: ((xhr?: XMLHttpRequest | undefined) => void) | undefined;
}

export const COLOR_PROGRESS = '#0062ff';

export const ACCEPT_FORMAT = [
  '.doc',
  '.png',
  '.jpg',
  '.docx',
  'xml,application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pdf',
  '.xls',
  '.xlsx',
  '.odt',
  '.ppt',
  '.pptx',
  '.txt',
  '.3gp',
  '.avi',
  '.mpeg',
  '.heic',
  '.heif',
  '.webm',
  '.mp3',
  '.mp4',
  '.wav',
  '.weba',
  '.css',
  '.html',
  '.js',
  '.html',
  '.json',
  '.xhtml',
  '.gz',
  '.tar',
  '.rar',
  '.epub',
  '.swf',
  '.djvu',
  '.gif',
  '.xml',
  '.bmp',
  '.flac',
  '.ogg',
  '.rtf',
  '.psd',
  '.indd',
  '.ibooks',
  '.key',
  '.pages',
  '.pps',
  '.pub',
  '.wps',
].join(',');

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
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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

export const ATTACHMENTS_TITLE_MAX_LENGTH = 20;
