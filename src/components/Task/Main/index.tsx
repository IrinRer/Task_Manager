import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import lodash, { uniqueId } from 'lodash';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';

const Main: React.FC = () => {
  const elements = [
    {
      id: lodash(uniqueId()).toString(),
      title: 'Описание',
      icon: <AlignLeftOutlined />,
      block: <Description />,
    },
    {
      id: lodash(uniqueId()).toString(),
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
      id: lodash(uniqueId()).toString(),
      title: 'Действия',
      icon: <ContainerOutlined />,
      block: <History />,
    },
  ];

  return (
    <div className={styles.taskMain}>
      <Title />
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
