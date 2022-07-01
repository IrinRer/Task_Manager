import React from 'react';
import {
  AttachmentsContext,
  IAttachmentsContext,
  useAttachmentsContextValue,
} from '../Context/contextAttachments';

interface IProps extends IAttachmentsContext {
  children: React.ReactNode;
}

const ContextWrapperAttachments: React.FC<IProps> = ({
  onDeleteFile,
  onDownload,
  children,
}) => {
  return (
    <AttachmentsContext.Provider
      value={useAttachmentsContextValue(onDeleteFile, onDownload)}
    >
      {children}
    </AttachmentsContext.Provider>
  );
};

export default ContextWrapperAttachments;
