import React from 'react';
import { Progress } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import ProgressBar from 'components/Common/Progress';

const ItemRender = ({ file, progress }) => {
  const url = URL.createObjectURL(file.originFileObj);
  const isProgress = progress > 0 ? <ProgressBar progress={progress} /> : null;

  if (file?.type?.includes('image')) {
    return (
      <>
        <img src={url} alt="img" style={{ width: '100px' }} />
        <p>{`Картинка - ${file.name}`}</p>
        {isProgress}
      </>
    );
  }

  return (
    <>
      <FileTextOutlined />
      <p>{`${file.name}`}</p>
      <p>{file.size}</p>
      {isProgress}
    </>
  );
};

export default ItemRender;
