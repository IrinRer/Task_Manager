import React, { useContext } from 'react';
import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { locale } from 'constants/common';
import { formatRelative } from 'date-fns';
import styles from './index.module.scss';

const DateCreated = () => {
  const notification = useContext(NotifierContext);

  if (!notification) return null;

  const dateCreated = `${formatRelative(
    new Date(notification.history_command.created),
    new Date(),
    { locale },
  )}`;

  return <span className={styles.date}>{dateCreated}</span>;
};

export default DateCreated;
