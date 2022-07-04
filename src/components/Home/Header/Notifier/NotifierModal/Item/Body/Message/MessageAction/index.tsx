import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { NOTIFY_MESSAGE } from 'constants/notify';
import React, { ReactElement, useContext } from 'react';

interface IProps {
  comment?: string | null;
  children?: ReactElement | Array<ReactElement> | string;
}

const MessageAction: React.FC<IProps> = ({ comment = null, children }) => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;

  const command = notification?.history_command.command_name;
  const target = notification.history_command.params.check_list?.title || '';

  return (
    <>
      <div className="notify-action">
        {NOTIFY_MESSAGE[command]}
        {target && <b>{target}</b>}
      </div>
      {comment && <div>{comment}</div>}
      {children}
    </>
  );
};

export default MessageAction;
