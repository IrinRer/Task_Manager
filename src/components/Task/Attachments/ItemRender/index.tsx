import React, { FC } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import ProgressBar from 'components/Common/Progress';
import FileText from '../FileText';
import FileImg from '../FileImg';

interface IProps {
  file: UploadFile;
  preview: () => void;
  progress: number;
  onDownload: (arg: string) => void;
  onDeleteFile: (arg: string) => void;
}

const ItemRender: FC<IProps> = ({
  file,
  preview,
  progress,
  onDownload,
  onDeleteFile,
}) => {
  const isProgress =
    progress > 0 && file.percent !== 100 ? (
      <ProgressBar progress={progress} />
    ) : null;

  return file?.type?.includes('image') ? (
    <>
      <FileImg
        file={{
          url: file.url || '',
          name: file.name,
          originFileObj: file.originFileObj,
        }}
        preview={preview}
        onDownload={onDownload}
        onDeleteFile={onDeleteFile}
      />
      {isProgress}
    </>
  ) : (
    <>
      <FileText
        file={{ size: file.size || 0, name: file.name }}
        onDownload={onDownload}
        onDeleteFile={onDeleteFile}
      />
      {isProgress}
    </>
  );
};

export default ItemRender;
