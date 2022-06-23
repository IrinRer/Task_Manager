import { NotificationMessageToShow } from 'constants/notify';
import React from 'react';
import styles from './index.module.scss';

interface IProps {
  statusName: string;
}

const TaskStatusChange: React.FC<IProps> = ({ statusName }) => {
  return (
    <>
      <div>{NotificationMessageToShow.taskStatusChange}</div>
      <div>Новый статус:</div>
      <div className={styles.status}>{statusName}</div>
    </>
  );
};

export default TaskStatusChange;
