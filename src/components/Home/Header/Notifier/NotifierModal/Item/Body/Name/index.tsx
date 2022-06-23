import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';
import styles from './index.module.scss';

const Name = () => {
  const notification = useContext(NotifierContext);

  if (!notification) return null;

  return (
    <div className={styles.name}>{notification.history_command.user.name}</div>
  );
};

export default Name;
