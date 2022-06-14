import React from 'react';
import { Button, notification } from 'antd';
import { TStatus } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatuses } from 'store/common/statuses/selectors';
import { changeTaskStatusAction } from 'store/tasks/thunk';
import { changeEditTaskStatusAction } from 'store/editTask/thunk';
import { getTaskById } from 'store/tasks/selectors';
import classnames from 'classnames';
import { StatusClass } from 'constants/common';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

interface IProps {
  taskId: string;
  edit?: boolean;
}

// флаг edit = true при изменении статуса в модальном окне. диспатчится другой экшн

const StatusChange: React.FC<IProps> = ({ taskId, edit = false }) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector(selectStatuses);
  const task = useAppSelector((state) => getTaskById(state, taskId));
  const myMaxRoleFromAllTask = useAppSelector((state) =>
    getMyMaxRoleForTask(state, task),
  );
  const isRights = getRights(myMaxRoleFromAllTask, RIGHTS_NAMES.editStatus);

  const handleClick = (task_status_id: string) => {
    if (!(task && isRights)) {
      notification.warn({ message: 'У Вас нет прав на изменение статуса' });
      return;
    }
    if (edit) {
      dispatch(changeEditTaskStatusAction({ task_id: taskId, task_status_id }));
    } else {
      dispatch(changeTaskStatusAction({ task_id: taskId, task_status_id }));
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
