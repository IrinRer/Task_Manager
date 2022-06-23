import { RcFile } from 'antd/es/upload/interface';
import { createContext, useMemo } from 'react';

export interface IAttachmentsContext {
  onDeleteFile: (arg: string) => void | null;
  onDownload: (arg: string) => void;
}

export interface IViewFileContext {
  file: {
    url?: string;
    name?: string;
    name_original?: string;
    originFileObj?: RcFile;
    size?: number;
    type?: string;
    percent?: number;
  };
  preview?: () => void;
  progress?: number;
  onDeleteFile: (arg: string) => void | null;
  onDownload: (arg: string) => void;
}

export const AttachmentsContext = createContext<IAttachmentsContext>({
  onDeleteFile: (arg) => {},
  onDownload: (arg) => {},
});

export const useAttachmentsContextValue = (
  onDeleteFile: (arg: string) => void | null,
  onDownload: (arg: string) => void,
) => {
  return useMemo(
    () => ({
      onDeleteFile,
      onDownload,
    }),
    [onDeleteFile, onDownload],
  );
};

export const ViewFileContext = createContext<IViewFileContext>({
  file: { size: 0, name: '', name_original: '' },
  preview: undefined,
  onDeleteFile: (arg) => {},
  onDownload: (arg) => {},
  progress: 0,
});

export const useViewFileContextValue = (
  onDeleteFile: (arg: string) => void | null,
  onDownload: (arg: string) => void,
  file: {
    url?: string;
    name?: string;
    name_original?: string;
    originFileObj?: RcFile;
    size?: number;
    type?: string;
    percent?: number;
  },
  preview?: () => void,
  progress?: number,
) => {
  return useMemo(
    () => ({
      onDeleteFile,
      onDownload,
      file,
      preview,
      progress,
    }),
    [onDeleteFile, onDownload, file, preview, progress],
  );
};
