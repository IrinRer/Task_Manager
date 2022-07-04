import React, { useContext } from 'react';
import scheduleIcon from 'assets/icons/schedule.svg';
import FlexWrapper from 'components/Common/FlexWrapper';
import { TaskContext } from 'components/Home/taskContext';
import { format } from 'date-fns';
import { DATE_FORMAT_UI } from 'constants/common';
import { ru } from 'date-fns/locale';
import styles from './index.module.scss';

const DateString: React.FC = () => {
  const task = useContext(TaskContext);
  if (!task) return null;

  const date = format(new Date(task.created), DATE_FORMAT_UI, { locale: ru });

  return (
    <FlexWrapper wrapperClassName={styles.wrapper}>
      <img src={scheduleIcon} alt="sheduleIcon" />
      <span>{date}</span>
    </FlexWrapper>
  );
};

export default DateString;
