import React, { useContext } from 'react';
import CustomTag from 'components/Common/CustomTag';
import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import MessageAction from '../MessageAction';

const TaskTagAssign = () => {
  const notification = useContext(NotifierContext);
  const name = notification?.history_command.params?.tag?.name || '';
  const color = notification?.history_command.params?.tag?.color;

  if (!notification) return null;

  return (
    <MessageAction>
      {color && <CustomTag title={name} color={color} closable={false} />}
    </MessageAction>
  );
};

export default TaskTagAssign;
