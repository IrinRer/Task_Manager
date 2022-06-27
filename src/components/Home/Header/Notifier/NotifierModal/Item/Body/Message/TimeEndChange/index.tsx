import { NotificationMessageToShow } from 'constants/notify';
import calendarIcon from 'assets/icons/calendar1.svg';
import React from 'react';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'constants/common';
import { ru } from 'date-fns/locale';
import styles from './index.module.scss';

interface IProps {
  time: string;
}

const TimeEndChange: React.FC<IProps> = ({ time }) => {
  const timeFormatted = format(new Date(time), DATE_FORMAT, {
    locale: ru,
  });

  return (
    <>
      {' '}
      <div className="notify-action">
        {NotificationMessageToShow.timeEndChange}
      </div>
      <div>Новый срок:</div>
      <div className={styles.date}>
        <img src={calendarIcon} alt="calendarIcon" /> <b>{timeFormatted}</b>
      </div>
    </>
  );
};

export default TimeEndChange;
