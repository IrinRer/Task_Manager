import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import uniqueId from 'lodash/uniqueId';
import description from 'assets/icons/description.png';
import comments from 'assets/icons/comments.png';
import history from 'assets/icons/history.png';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';

const Main: React.FC = () => {
  const elements = [
    {
      id: uniqueId(),
      title: 'Описание',
      icon: <img src={description} alt="description" />,
      block: <Description />,
    },
    {
      id: uniqueId(),
      title: 'Комментарии',
      icon: <img src={comments} alt="comments" />,
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
      icon: <img src={history} alt="history" />,
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
