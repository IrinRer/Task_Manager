import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useContext } from 'react';
import { getTaskFileAllType } from 'store/editTask/attachments/selectors';
import { AttachmentsContext } from '../context';
import ContextWrapperViewFile from '../ContextWrapper/ViewFileContex';
import FileText from './FileText';

const ViewFileAllType = () => {
  const taskFile = useAppSelector(getTaskFileAllType);
  const file = useContext(AttachmentsContext);
  return (
    <>
      {taskFile?.map((item) => {
        return (
          <ContextWrapperViewFile
            file={{ size: item.size, name: item.name_original }}
            onDeleteFile={file.onDeleteFile}
            onDownload={file.onDownload}
            preview={undefined}
            progress={0}
            key={item.name_original}
          >
            <FileText key={item.name_original} />
          </ContextWrapperViewFile>
        );
      })}
    </>
  );
};

export default ViewFileAllType;
