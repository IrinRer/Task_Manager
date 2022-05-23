import React from 'react';
import { Button, notification } from 'antd';
import { TStatus } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatuses } from 'store/common/statuses/selectors';
import { changeTaskStatusAction } from 'store/tasks/thunk';
import { changeEditTaskStatusAction } from 'store/editTask/thunk';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getTaskById } from 'store/tasks/selectors';
import { canUserChangeTaskStatus } from 'helpers/userRoles';
import classnames from 'classnames';
import { StatusClass } from 'constants/common';
import styles from './index.module.scss';

interface IProps {
  task_id: string;
  edit?: boolean;
}

// флаг edit = true при изменении статуса в модальном окне. диспатчится другой экшн

const StatusChange: React.FC<IProps> = ({ task_id, edit = false }) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(selectStatuses);
  const userId = useAppSelector(getVerifyIdUser);
  const task = useAppSelector((state) => getTaskById(state, task_id));

  const handleClick = (task_status_id) => {
    if (!(task && canUserChangeTaskStatus(userId, task))) {
      notification.warn({ message: 'У Вас нет прав на изменение статуса' });
      return;
    }
    if (edit) {
      dispatch(changeEditTaskStatusAction({ task_id, task_status_id }));
    } else {
      dispatch(changeTaskStatusAction({ task_id, task_status_id }));
    }
  };

  return (
    <div className={styles.wrapper}>
      {statuses?.map((status: TStatus) => {
        const current = status.task_status_id === task?.status.task_status_id;
        const classNames = classnames(
          styles.button,
          current ? styles[StatusClass[status.name]] : '',
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
