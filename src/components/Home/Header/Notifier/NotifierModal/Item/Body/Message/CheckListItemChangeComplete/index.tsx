import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';
import CheckListItem from '../CheckListItem';

interface IProps {
  title: string; // название чек листа
  message: string; // название пункта
  complete: boolean;
}

const CheckListItemChangeComplete: React.FC<IProps> = ({
  title,
  message,
  complete,
}) => {
  return (
    <>
      <div className="notify-action">
        {NotificationMessageToShow.checkListItemChangeComplete} <b>{title}</b>
      </div>
      <CheckListItem title={message} complete={complete} />
    </>
  );
};

export default CheckListItemChangeComplete;
