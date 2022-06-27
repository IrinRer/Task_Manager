import Priority from 'components/Home/Block/Task/Priority';
import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';

interface IProps {
  priority: string;
}

const TaskPriorityChange: React.FC<IProps> = ({ priority }) => {
  return (
    <>
      <div className="notify-action">
        {NotificationMessageToShow.taskPriorityChange}
      </div>
      <div>Новый приоритет: </div>
      <Priority priority={priority} />
    </>
  );
};

export default TaskPriorityChange;
