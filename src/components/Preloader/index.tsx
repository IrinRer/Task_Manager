import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const Preloader: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
  return <Spin indicator={antIcon} />;
};

export default Preloader;
