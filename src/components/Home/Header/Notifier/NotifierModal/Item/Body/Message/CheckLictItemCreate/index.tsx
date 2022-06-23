import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';

interface IProps {
  title: string;
}

const CheckListItemCreate: React.FC<IProps> = ({ title }) => {
  return (
    <div>
      {NotificationMessageToShow.checkListItemCreate} <b>{title}</b>
    </div>
  );
};

export default CheckListItemCreate;
