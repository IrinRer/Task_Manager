import React from 'react';
import { Button, notification } from 'antd';
import { TStatus } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getCompletedStatusID,
  selectStatuses,
} from 'store/common/statuses/selectors';
import { changeTaskStatusAction } from 'store/tasks/thunk';
import { getTaskById } from 'store/tasks/selectors';
import classnames from 'classnames';
import { format } from 'date-fns';
import { DATE_FORMAT_SERVER } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  taskId: string;
}

// флаг edit = true при изменении статуса в модальном окне. диспатчится другой экшн

const StatusChange: React.FC<IProps> = ({ taskId }) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(selectStatuses);
  const completedStatusId = useAppSelector(getCompletedStatusID);
  const task = useAppSelector((state) => getTaskById(state, taskId));

  const handleClick = (task_status_id: string) => {
    if (!(task /* && canUserChangeTaskStatus(userId, task) */)) {
      notification.warn({ message: 'У Вас нет прав на изменение статуса' });
      return;
    }

    const dateStop =
      task_status_id === completedStatusId
        ? format(new Date(), DATE_FORMAT_SERVER)
        : '';

    dispatch(
      changeTaskStatusAction({
        task_id: taskId,
        task_status_id,
        exec_stop: dateStop,
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      {statuses?.map((status: TStatus) => {
        const current = status.task_status_id === task?.status.task_status_id;
        const classNames = classnames(
          styles.button,
          current ? styles.current : '',
        );
        return (
          <Button
            className={classNames}
            type="text"
            disabled={current}
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
