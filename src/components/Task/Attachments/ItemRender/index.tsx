import React, { useContext } from 'react';
import ProgressBar from 'components/Common/Progress';
import FileText from '../ViewFileAllType/FileText';
import FileImg from '../ViewFileImg/FileImg';
import { ViewFileContext } from '../Context/contextViewFile';

const ItemRender = () => {
  const valueContext = useContext(ViewFileContext);

  return (
    <>
      {valueContext.file?.type?.includes('image') ? <FileImg /> : <FileText />}
      {valueContext.progress &&
      valueContext.progress > 0 &&
      valueContext.file.percent !== 100 ? (
        <ProgressBar progress={valueContext.progress} />
      ) : null}
    </>
  );
};

export default ItemRender;
