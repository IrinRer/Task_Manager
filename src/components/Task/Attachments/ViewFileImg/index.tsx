import React, { useContext } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getViewFileImg } from 'store/editTask/attachments/selectors';
import ContextWrapperViewFile from '../ContextWrapper/ViewFileContex';
import FileImg from './FileImg';
import { AttachmentsContext } from '../Context/contextAttachments';

const ViewFileImg = () => {
  const img = useAppSelector(getViewFileImg);
  const file = useContext(AttachmentsContext);

  return (
    <>
      {img?.map((item: { name: string; url: string }) => {
        return (
          <ContextWrapperViewFile
            file={item}
            onDeleteFile={file.onDeleteFile}
            onDownload={file.onDownload}
            preview={undefined}
            progress={0}
            key={item.name}
          >
            <FileImg key={item.name} />
          </ContextWrapperViewFile>
        );
      })}
    </>
  );
};

export default ViewFileImg;
