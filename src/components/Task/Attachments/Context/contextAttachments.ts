import { createContext, useMemo } from 'react';

export interface IAttachmentsContext {
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
