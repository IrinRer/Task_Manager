import { NotifierContext } from 'components/Home/Header/Notifier/notifierContext';
import { NOTIFY_MESSAGE } from 'constants/notify';
import React, { ReactElement, useContext } from 'react';

interface IProps {
  target?: string | null;
  comment?: string | null;
  children?: ReactElement | Array<ReactElement> | string;
}

const MessageAction: React.FC<IProps> = ({
  target = null,
  comment = null,
  children,
}) => {
  const notification = useContext(NotifierContext);
  if (!notification) return null;
  const command = notification?.history_command.command_name;

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
