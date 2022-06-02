import React from 'react';
import { Row, Col, Typography } from 'antd';
import imgError from 'assets/error.svg';

import styles from './index.module.scss';

const { Title } = Typography;

interface IProps {
  text: string;
}

const Error: React.FC<IProps> = ({ text }) => {
  return (
    <Row align="middle" justify="center" className={styles.row}>
      <Col>
        <img src={imgError} alt="Error img" className={styles.img} />
        <Title level={2} className={styles.title}>
          {text}
        </Title>
      </Col>
    </Row>
  );
};

export default Error;
