import React, { useContext } from 'react';
import ProgressBar from 'components/Common/Progress';
import FileText from '../ViewFileAllType/FileText';
import FileImg from '../ViewFileImg/FileImg';
import { ViewFileContext } from '../context';

const ItemRender = () => {
  const file = useContext(ViewFileContext);
  const isProgress =
    file.progress && file.progress > 0 && file.file.percent !== 100 ? (
      <ProgressBar progress={file.progress} />
    ) : null;

  return file.file?.type?.includes('image') ? (
    <>
      <FileImg />
      {isProgress}
    </>
  ) : (
    <>
      <FileText />
      {isProgress}
    </>
  );
};

export default ItemRender;
