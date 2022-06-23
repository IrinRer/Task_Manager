import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';

interface IProps {
  title: string;
}

const TaskTitleChange: React.FC<IProps> = ({ title }) => {
  return (
    <>
      <div>{NotificationMessageToShow.taskTitleChange}</div>
      <div>
        Новый заголовок: <b>{title}</b>
      </div>
    </>
  );
};

export default TaskTitleChange;
