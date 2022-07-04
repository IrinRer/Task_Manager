import { createContext, SetStateAction, useMemo } from 'react';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';

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
  setFile: React.Dispatch<SetStateAction<any>>;
  fileList: Array<UploadFile> | null;
  preview?: () => void;
  progress?: number;
}

export const ViewFileContext = createContext<IViewFileContext>({
  file: { size: 0, name: '', name_original: '' },
  preview: undefined,
  setFile: (arg) => {},
  onDeleteFile: (arg) => {},
  fileList: null,
  onDownload: (arg) => {},
  progress: 0,
});

export const useViewFileContextValue = ({
  file,
  preview,
  progress,
  onDeleteFile,
  setFile,
  fileList,
  onDownload,
}: IViewFileContext) => {
  return useMemo(
    () => ({
      file,
      preview,
      progress,
      onDeleteFile,
      setFile,
      fileList,
      onDownload,
    }),
    [file, onDeleteFile, onDownload, fileList, setFile, preview, progress],
  );
};
