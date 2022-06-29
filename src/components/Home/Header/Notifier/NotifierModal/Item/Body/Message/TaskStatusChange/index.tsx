import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';
import MessageAction from '../MessageAction';
import styles from './index.module.scss';

const TaskStatusChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  return (
    <MessageAction comment="Новый статус:">
      <div className={styles.status}>
        {notification.history_command.params.status?.name || ''}
      </div>
    </MessageAction>
  );
};

export default TaskStatusChange;
