import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import History from '../History';

const Main: React.FC = () => {
  return (
    <div className={styles.taskMain}>
      <TextArea
        autoSize
        placeholder="Введите название"
        className={styles.name}
      />
      <div className={styles.border} />

      <div className={styles.section}>
        <AlignLeftOutlined />
        <div className={styles.wrapper}>
          Описание
          <TextArea
            autoSize
            placeholder="Введите описание, чтобы сделать задачу понятнее"
            className={styles.desc}
          />
        </div>
      </div>

      <div className={styles.section}>
        <CommentOutlined />
        <div className={styles.wrapper}>
          Комментарии
          <TextArea
            autoSize
            placeholder="Оставьте комментарий"
            className={styles.comm}
          />
        </div>
      </div>

      <div className={styles.section}>
        <ContainerOutlined />
        <div className={styles.wrapper}>
          Действия
          <History />
        </div>
      </div>
    </div>
  );
};

export default Main;
