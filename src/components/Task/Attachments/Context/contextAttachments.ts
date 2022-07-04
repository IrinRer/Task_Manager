import { UploadFile } from 'antd/lib/upload/interface';
import { createContext, SetStateAction, useMemo } from 'react';

export interface IAttachmentsContext {
  onDeleteFile: (arg: string) => void | null;
  onDownload: (arg: string) => void;
  setFile: React.Dispatch<SetStateAction<any[]>>;
  fileList: Array<UploadFile> | null;
}

export const AttachmentsContext = createContext<IAttachmentsContext>({
  onDeleteFile: (arg) => {},
  onDownload: (arg) => {},
  setFile: (arg) => {},
  fileList: null,
});

export const useAttachmentsContextValue = (
  onDeleteFile: (arg: string) => void | null,
  onDownload: (arg: string) => void,
  setFile: React.Dispatch<SetStateAction<any[]>>,
  fileList: Array<UploadFile> | null,
) => {
  return useMemo(
    () => ({
      onDeleteFile,
      onDownload,
      fileList,
      setFile,
    }),
    [onDeleteFile, onDownload, setFile, fileList],
  );
};
