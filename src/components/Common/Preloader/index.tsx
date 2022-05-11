import React from 'react';
import Spinner from 'components/Common/Spinner';
import { SpinProps } from 'antd';
import style from './index.module.scss';

interface IProps extends SpinProps {
  margin?: string;
}

const Preloader: React.FC<IProps> = ({ margin = '', ...restProps }) => (
  <div className={style.preloader}>
    <Spinner className={style.spinner} style={{ margin }} {...restProps} />
  </div>
);

export default Preloader;
