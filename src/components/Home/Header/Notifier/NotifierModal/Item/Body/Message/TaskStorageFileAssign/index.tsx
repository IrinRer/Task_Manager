import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';
import MessageAction from '../MessageAction';

const TaskStorageFileAssign = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  const file = notification.history_command.params.storage_file;

  return (
    <MessageAction>
      <b>{file?.name_original || ''}</b>
    </MessageAction>
  );
};

export default TaskStorageFileAssign;
