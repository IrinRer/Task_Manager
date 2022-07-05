import React from 'react';
import descriptionIcon from 'assets/icons/description.svg';
import historyIcon from 'assets/icons/history.svg';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Spinner from 'components/Common/Spinner';
import { isDeleteCheckListLoading } from 'store/editTask/checkLists/deleteCheckList/selectors';
import { useWindowSize } from 'customHooks/useWindowSize';
import {
  getFileName,
  isClickedAttachments,
} from 'store/editTask/attachments/selectors';
import Attachments from 'components/Task/Attachments';
import { MIN_DESKTOP_WIDTH } from 'constants/common';
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
  const isClickedAttachmentsBtn = useAppSelector(isClickedAttachments);
  const attachments = useAppSelector(getFileName);
  const isAttachments = isClickedAttachmentsBtn || attachments.length;
  const size = useWindowSize();

  return (
    <div className={styles.taskMain}>
      <div className={styles.taskHeader}>
        <div className={styles.titleRow}>
          {(size.width || 0) >= MIN_DESKTOP_WIDTH && <Title />}
          <div className={styles.options}>
            <Actions />
            <Options />
          </div>
        </div>
        {(size.width || 0) < MIN_DESKTOP_WIDTH && <Title />}
        <div className={styles.border} />
      </div>

      {(size.width || 0) < MIN_DESKTOP_WIDTH && <Info />}

      <InputWrapper
        labelText="Описание"
        icon={<img src={descriptionIcon} alt="description" />}
      >
        <Description />
      </InputWrapper>

      {isCheckListLoading ? <Spinner /> : <Checklist />}
      {isAttachments ? <Attachments /> : null}

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
