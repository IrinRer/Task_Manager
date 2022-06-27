import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';

interface IProps {
  title: string;
}

const CheckListTitleChange: React.FC<IProps> = ({ title }) => {
  return (
    <>
      <div className="notify-action">
        {NotificationMessageToShow.checkListTitleChange}
      </div>
      <div>
        Новое название: <b>{title}</b>
      </div>
    </>
  );
};

export default CheckListTitleChange;
