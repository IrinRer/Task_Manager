import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import style from './index.module.scss';

const Preloader: React.FC = () => {
  const antIcon = <LoadingOutlined spin />;
  return (
    <div className={style.preloader}>
      <Spin indicator={antIcon} size="large" />
    </div>
  );
};

export default Preloader;
