import React from 'react';
import ProgressBar from 'components/Common/Progress';
import FileText from '../FileText';
import FileImg from '../FileImg';

const ItemRender = ({ file, preview,setFile, fileList, progress }) => {
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
