import React from 'react';
import descriptionIcon from 'assets/icons/description.svg';
import historyIcon from 'assets/icons/history.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Spinner from 'components/Common/Spinner';
import { isDeleteCheckListLoading } from 'store/editTask/checkLists/deleteCheckList/selectors';
import { useWindowSize } from 'customHooks/useWindowSize';
import styles from './index.module.scss';
import History from './History';
import InputWrapper from './InputWrapper';
import Options from '../Options';
import Description from './Description';
import Title from './Title';
import Checklist from '../Checklist';
import Actions from '../Actions';
import Info from '../Info';

const Main: React.FC = () => {
  const isCheckListLoading = useAppSelector(isDeleteCheckListLoading);
  const size = useWindowSize();

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

      {(size.width || 0) < 768 && <Info />}

      <InputWrapper
        labelText="Описание"
        icon={<img src={descriptionIcon} alt="description" />}
      >
        <Description />
      </InputWrapper>

      {isCheckListLoading ? <Spinner /> : <Checklist />}

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
