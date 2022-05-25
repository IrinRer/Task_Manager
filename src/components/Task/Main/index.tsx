import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';
import Checklist from '../Checklist';

const Main: React.FC = () => {
  return (
    <div className={styles.taskMain}>
      <Title />

      <InputWrapper labelText="Описание" icon={<AlignLeftOutlined />}>
        <Description />
      </InputWrapper>

      <Checklist />

      <InputWrapper labelText="Комментарии" icon={<CommentOutlined />}>
        <TextArea
          autoSize
          placeholder="Оставьте комментарий"
          className={styles.comm}
        />
      </InputWrapper>

      <InputWrapper labelText="Действия" icon={<ContainerOutlined />}>
        <History />
      </InputWrapper>
    </div>
  );
};

export default Main;
