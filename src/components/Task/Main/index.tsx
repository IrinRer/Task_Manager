import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { isClickedAttachments } from 'store/editTask/attachments/selectors';
import uniqueId from 'lodash/uniqueId';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';
import Attachments from './Attachments';

const Main: React.FC = () => {
  const clickedAttachments = useAppSelector(isClickedAttachments);

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
      <Title />
      {elements.map((el) => {
        if (el.title === 'Описание' && clickedAttachments) {
          return (
            <div className={styles.wrapperAttachments} key='attachments'>
              <PaperClipOutlined />
              <Attachments />
            </div>
          );
        }
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
