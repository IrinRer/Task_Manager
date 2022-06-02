import React from 'react';
import TextArea from 'antd/lib/input/TextArea';
import descriptionIcon from 'assets/icons/description.svg';
import commentsIcon from 'assets/icons/comments.svg';
import historyIcon from 'assets/icons/history.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Spinner from 'components/Common/Spinner';
import { isDeleteCheckListLoading } from 'store/editTask/checkLists/deleteCheckList/selectors';
import styles from './index.module.scss';
import History from './History';
import InputWrapper from './InputWrapper';
import Options from '../Options';
import Description from './Description';
import Title from './Title';
import Checklist from '../Checklist';
import Actions from '../Actions';

const Main: React.FC = () => {
  const isCheckListLoading = useAppSelector(isDeleteCheckListLoading);

  return (
    <div className={styles.taskMain}>
      <div className={styles.taskHeader}>
        <div className={styles.titleRow}>
          <Title />
          <div className={styles.options}>
            <Actions />
            <Options />
          </div>
        </div>
        <div className={styles.border} />
      </div>

      <InputWrapper
        labelText="Описание"
        icon={<img src={descriptionIcon} alt="description" />}
      >
        <Description />
      </InputWrapper>

      {isCheckListLoading ? <Spinner /> : <Checklist />}

      <InputWrapper
        labelText="Комментарии"
        icon={<img src={commentsIcon} alt="comments" />}
      >
        <TextArea
          autoSize
          placeholder="Оставьте комментарий"
          className={styles.comm}
        />
      </InputWrapper>

      <InputWrapper
        labelText="Действия"
        icon={<img src={historyIcon} alt="history" />}
      >
        <History />
      </InputWrapper>
    </div>
  );
};

export default Main;
