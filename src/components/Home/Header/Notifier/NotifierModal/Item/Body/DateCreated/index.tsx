import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { DATE_TIME_FORMAT } from 'constants/common';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useContext } from 'react';
import styles from './index.module.scss';

const DateCreated = () => {
  const notification = useContext(NotifierContext);

  if (!notification) return null;

  const dateCreated = format(
    new Date(notification.history_command.created),
    DATE_TIME_FORMAT,
    { locale: ru },
  );

  return <span className={styles.date}>{dateCreated}</span>;
};

export default DateCreated;
