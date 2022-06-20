import React, { Dispatch, FC, SetStateAction } from 'react';
import ProgressBar from 'components/Common/Progress';
import { UploadFile } from 'antd/lib/upload/interface';
import FileText from '../FileText';
import FileImg from '../FileImg';

interface IProps {
  file: UploadFile;
  preview: () => void;
  setFile: Dispatch<SetStateAction<UploadFile[]>>;
  fileList: Array<UploadFile>;
  progress: number;
}

const ItemRender: FC<IProps> = ({
  file,
  preview,
  setFile,
  fileList,
  progress,
}) => {
  const isProgress =
    progress > 0 && file.percent !== 100 ? (
      <ProgressBar progress={progress} />
    ) : null;

  if (file?.type?.includes('image')) {
    return (
      <>
        <FileImg
          file={file}
          preview={preview}
          setFile={setFile}
          fileList={fileList}
        />
        {isProgress}
      </>
    );
  }
  return (
    <>
      <FileText file={file} />
      {isProgress}
    </>
  );
};

export default ItemRender;
