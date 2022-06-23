import React from 'react';
import {
  IViewFileContext,
  useViewFileContextValue,
  ViewFileContext,
} from '../../context';

interface IProps extends IViewFileContext {
  children: React.ReactNode;
}

const ContextWrapperViewFile: React.FC<IProps> = ({
  onDeleteFile,
  onDownload,
  file,
  preview,
  progress,
  children,
}) => {
  return (
    <ViewFileContext.Provider
      value={useViewFileContextValue(
        onDeleteFile,
        onDownload,
        file,
        preview,
        progress,
      )}
    >
      {children}
    </ViewFileContext.Provider>
  );
};

export default ContextWrapperViewFile;
