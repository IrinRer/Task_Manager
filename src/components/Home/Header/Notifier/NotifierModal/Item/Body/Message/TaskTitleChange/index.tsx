import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { NOTIFY_MESSAGE } from 'constants/notify';
import React, { useContext } from 'react';

const TaskTitleChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  return (
    <>
      <div className="notify-action">
        {NOTIFY_MESSAGE[notification.history_command.command_name]}
      </div>
      <div>
        Новый заголовок:{' '}
        <b>{notification.history_command.params.title || ''}</b>
      </div>
    </>
  );
};

export default TaskTitleChange;
