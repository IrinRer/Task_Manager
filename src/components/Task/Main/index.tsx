import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import uniqueId from 'lodash/uniqueId';
import descriptionIcon from 'assets/icons/description.svg';
import commentsIcon from 'assets/icons/comments.svg';
import historyIcon from 'assets/icons/history.svg';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Spinner from 'components/Common/Spinner';
import { isDeleteCheckListLoading } from 'store/editTask/checkLists/deleteCheckList/selectors';
import styles from './index.module.scss';
import History from './History';
import InputWrapper from './InputWrapper';
import Options from '../Options';
import Description from './Description';
import Title from './Title';
import Description from '../Description';
import Title from '../Title';
import Checklist from '../Checklist';

const Main: React.FC = () => {
  const isCheckListLoading = useAppSelector(isDeleteCheckListLoading);

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

      <InputWrapper labelText="Описание" icon={<AlignLeftOutlined />}>
        <Description />
      </InputWrapper>

      {isCheckListLoading ? <Spinner /> : <Checklist />}

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
