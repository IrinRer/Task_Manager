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
import descriptionIcon from 'assets/icons/description.svg';
import commentsIcon from 'assets/icons/comments.svg';
import historyIcon from 'assets/icons/history.svg';
import styles from './index.module.scss';
import History from './History';
import InputWrapper from './InputWrapper';
import Attachments from './Attachments';
import Options from '../Options';
import Description from './Description';
import Title from './Title';

const Main: React.FC = () => {
  const clickedAttachments = useAppSelector(isClickedAttachments);

  const elements = [
    {
      id: uniqueId(),
      title: 'Описание',
      icon: <img src={descriptionIcon} alt="description" />,
      block: <Description />,
    },

    {
      id: uniqueId(),
      title: 'Комментарии',
      icon: <img src={commentsIcon} alt="comments" />,
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
      icon: <img src={historyIcon} alt="history" />,
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
