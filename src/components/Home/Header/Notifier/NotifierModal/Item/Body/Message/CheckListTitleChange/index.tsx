import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import React, { useContext } from 'react';
import MessageAction from '../MessageAction';
import SimpleMessage from '../SimpleMessage';

const CheckListTitleChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  return (
    <MessageAction>
      <SimpleMessage
        text="Новое название: "
        item={notification.history_command.params.check_list?.title || ''}
      />
    </MessageAction>
  );
};

export default CheckListTitleChange;
