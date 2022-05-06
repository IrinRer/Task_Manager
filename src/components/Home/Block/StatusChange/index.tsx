import React from 'react';
import { Button } from 'antd';
import { TStatus } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatuses } from 'store/common/statuses/selectors';
import { changeTaskStatusAction } from 'store/tasks/thunk';
import styles from './index.module.scss';

interface IProps {
  task_id: string;
}

const StatusChange: React.FC<IProps> = ({ task_id }) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(selectStatuses);

  const handleClick = (task_status_id) => {
    dispatch(changeTaskStatusAction({ task_id, task_status_id }));
  };
  return (
    <div className={styles.wrapper}>
      {statuses?.map((status: TStatus) => {
        return (
          <Button
            className={styles.button}
            type="text"
            key={status.task_status_id}
            onClick={() => handleClick(status.task_status_id)}
          >
            {status.name}
          </Button>
        );
      })}
    </div>
  );
};

export default StatusChange;
