import { Command } from 'constants/notify';
import calendarIcon from 'assets/icons/calendar1.svg';
import React, { useContext } from 'react';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'constants/common';
import { ru } from 'date-fns/locale';
import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import MessageAction from '../MessageAction';
import styles from './index.module.scss';

const TimeChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  const isEndTime =
    notification.history_command.command_name === Command.timeEndChange;

  const time = isEndTime
    ? notification.history_command.params.exec_stop
    : notification.history_command.params.exec_start;

  const timeFormatted = format(new Date(time || ''), DATE_FORMAT, {
    locale: ru,
  });

  return (
    <MessageAction comment={isEndTime ? 'Новый срок:' : 'Новое время начала:'}>
      <div className={styles.date}>
        <img src={calendarIcon} alt="calendarIcon" />
        <b>{timeFormatted}</b>
      </div>
    </MessageAction>
  );
};

export default TimeChange;
