import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import {
  AlignLeftOutlined,
  CommentOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Spinner from 'components/Common/Spinner';
import { isDeleteCheckListLoading } from 'store/editTask/checkLists/deleteCheckList/selectors';
import styles from './index.module.scss';
import History from '../History';
import InputWrapper from './InputWrapper';
import Description from '../Description';
import Title from '../Title';
import Checklist from '../Checklist';

const Main: React.FC = () => {
  const isCheckListLoading = useAppSelector(isDeleteCheckListLoading);

  return (
    <div className={styles.taskMain}>
      <Title />

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
