import Priority from 'components/Home/Block/Task/Priority';
import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';
import MessageAction from '../MessageAction';

const TaskPriorityChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  return notification.history_command.params.priority ? (
    <MessageAction comment="Новый приоритет:">
      <Priority priority={notification.history_command.params.priority.name} />
    </MessageAction>
  ) : null;
};

export default TaskPriorityChange;
