import { createContext, useMemo } from 'react';
import { RcFile } from 'antd/lib/upload';

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
  onDeleteFile: (arg: string) => void | null;
  onDownload: (arg: string) => void;
  preview?: () => void;
  progress?: number;
}

export const ViewFileContext = createContext<IViewFileContext>({
  file: { size: 0, name: '', name_original: '' },
  preview: undefined,
  onDeleteFile: (arg) => {},
  onDownload: (arg) => {},
  progress: 0,
});

export const useViewFileContextValue = ({
  file,
  preview,
  progress,
  onDeleteFile,
  onDownload,
}: IViewFileContext) => {
  return useMemo(
    () => ({
      file,
      preview,
      progress,
      onDeleteFile,
      onDownload,
    }),
    [file, onDeleteFile, onDownload, preview, progress],
  );
};
