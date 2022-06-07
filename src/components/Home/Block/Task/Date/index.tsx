import React, { useContext } from 'react';
import scheduleIcon from 'assets/icons/schedule.svg';
import FlexWrapper from 'components/Common/FlexWrapper';
import { TaskContext } from 'constants/taskContext';
import styles from './index.module.scss';

const DateString: React.FC = () => {
  const task = useContext(TaskContext);

  if (!task) return null;

  const date = new Date(task.created).toLocaleDateString('ru');

  return (
    <FlexWrapper wrapperClassName={styles.wrapper}>
      <img src={scheduleIcon} alt="sheduleIcon" />
      <span>{date}</span>
    </FlexWrapper>
  );
};

export default DateString;
