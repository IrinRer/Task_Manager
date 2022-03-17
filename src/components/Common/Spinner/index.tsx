import React from 'react';
import { Spin, SpinProps } from 'antd';

import styles from './index.module.scss';

interface IProps extends SpinProps {
  margin?: string;
}
const Spinner: React.FC<IProps> = ({ margin = '', ...restProps }) => (
  <Spin className={styles.spinner} style={{ margin }} {...restProps} />
);

export default Spinner;
