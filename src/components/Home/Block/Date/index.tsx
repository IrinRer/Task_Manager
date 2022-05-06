import React from 'react';
import scheduleIcon from 'assets/icons/schedule.svg';
import FlexWrapper from 'components/Common/FlexWrapper';
import styles from './index.module.scss';

interface IProps {
  dateString: string;
}

const DateString: React.FC<IProps> = ({ dateString }) => {
  const date = new Date(dateString).toLocaleDateString('ru');
  return (
    <FlexWrapper wrapperClassName={styles.wrapper}>
      <img src={scheduleIcon} alt="sheduleIcon" />
      <span>{date}</span>
    </FlexWrapper>
  );
};

export default DateString;
