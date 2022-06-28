import React from 'react';
import {
  IViewFileContext,
  useViewFileContextValue,
  ViewFileContext,
} from '../../Context/contextViewFile';

interface IProps extends IViewFileContext {
  children: React.ReactNode;
}

const ContextWrapperViewFile: React.FC<IProps> = ({
  file,
  onDeleteFile,
  onDownload,
  preview,
  progress,
  children,
}) => {
  return (
    <ViewFileContext.Provider
      value={useViewFileContextValue(
        file,
        onDeleteFile,
        onDownload,
        preview,
        progress,
      )}
    >
      {children}
    </ViewFileContext.Provider>
  );
};

export default ContextWrapperViewFile;
