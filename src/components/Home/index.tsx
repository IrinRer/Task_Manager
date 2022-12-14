import { Row } from 'antd';
import Preloader from 'components/Common/Preloader';
import { BlockType } from 'constants/types/common';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React from 'react';
import { selectTasksLoading } from 'store/tasks/selectors';
import Block from './Block';
import Header from './Header';
import styles from './index.module.scss';

const Display: React.FC = () => {
  const loading = useAppSelector(selectTasksLoading);

  return (
    <Row className={styles.wrapper}>
      <Header />
      {loading ? (
        <Preloader size="large" />
      ) : (
        <div className={styles.blocks}>
          <Block blockType={BlockType.in} />
          <Block blockType={BlockType.work} />
          <Block blockType={BlockType.done} />
        </div>
      )}
    </Row>
  );
};

export default Display;
