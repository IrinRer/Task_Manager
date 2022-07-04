import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { Command } from 'constants/notify';
import React, { useContext } from 'react';
import CheckListItem from '../CheckListItem';
import MessageAction from '../MessageAction';

const CheckListItemChange = () => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  const { params } = notification.history_command;

  const message =
    notification.history_command.command_name ===
    Command.checkListItemChangeComplete
      ? params.check_list_item?.message || ''
      : params.message || '';
  const complete = params.complete || false;

  return (
    <MessageAction>
      <CheckListItem title={message} complete={complete} />
    </MessageAction>
  );
};

export default CheckListItemChange;
