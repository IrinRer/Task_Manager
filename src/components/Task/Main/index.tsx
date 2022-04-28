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

const Main: React.FC = () => {
  const elements = [
    { title: 'Описание', icon: <AlignLeftOutlined />, block: <Description /> },
    {
      title: 'Комментарии',
      icon: <CommentOutlined />,
      block: (
        <TextArea
          autoSize
          placeholder="Оставьте комментарий"
          className={styles.comm}
        />
      ),
    },
    { title: 'Действия', icon: <ContainerOutlined />, block: <History /> },
  ];

  return (
    <div className={styles.taskMain}>
      <Title />
      {elements.map((el) => {
        return (
          <InputWrapper key={el.title} labelText={el.title} icon={el.icon}>
            {el.block}
          </InputWrapper>
        );
      })}
    </div>
  );
};

export default Main;
