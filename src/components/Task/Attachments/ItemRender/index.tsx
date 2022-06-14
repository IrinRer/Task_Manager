import React from 'react';
import ProgressBar from 'components/Common/Progress';
import FileText from '../FileText';
import FileImg from '../FileImg';

const ItemRender = ({ file, preview, onRemove, onDownload, progress }) => {
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
          onRemove={onRemove}
          onDownload={onDownload}
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
