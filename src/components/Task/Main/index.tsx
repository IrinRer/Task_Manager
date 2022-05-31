import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import uniqueId from 'lodash/uniqueId';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';
import Options from '../Options/Options';

const Main: React.FC = () => {
  const elements = [
    {
      id: uniqueId(),
      title: 'Описание',
      icon: <AlignLeftOutlined />,
      block: <Description />,
    },
    {
      id: uniqueId(),
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
    {
      id: uniqueId(),
      title: 'Действия',
      icon: <ContainerOutlined />,
      block: <History />,
    },
  ];

  return (
    <div className={styles.taskMain}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <Title />
        </div>
        <div className={styles.options}>
          <Options />
        </div>
      </div>

      {elements.map((el) => {
        return (
          <InputWrapper key={el.id} labelText={el.title} icon={el.icon}>
            {el.block}
          </InputWrapper>
        );
      })}
    </div>
  );
};

export default Main;
