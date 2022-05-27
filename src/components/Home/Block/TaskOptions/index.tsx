import React from 'react';
import { Button, notification } from 'antd';
import { TTask } from 'constants/types/common';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { canUserDuplicateTask, isUserTaskAuthor } from 'helpers/userRoles';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import styles from './index.module.scss';

interface IProps {
  task: TTask;
}

const TaskOptions: React.FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getVerifyIdUser);

  const handleCloneTask = (): void => {
    if (canUserDuplicateTask(userId, task)) {
      dispatch(cloneTaskAction(task.task_id));
    } else notification.warn({ message: 'Нет прав на дублирование задачи' });
  };

  const handleDeleteTask = (): void => {
    if (isUserTaskAuthor(userId, task)) {
      dispatch(deleteTaskAction(task.task_id));
    } else notification.warn({ message: 'Удалить задачу может только автор' });
  };

  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} type="text" onClick={handleCloneTask}>
        Дублировать задачу
      </Button>
      <Button className={styles.button} type="text">
        Отслеживать задачу
      </Button>
      <Button className={styles.button} type="text" onClick={handleDeleteTask}>
        Удалить задачу
      </Button>
    </div>
  );
};

export default TaskOptions;
