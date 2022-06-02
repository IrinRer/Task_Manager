import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { canUserDuplicateTask, isUserTaskAuthor } from 'helpers/userRoles';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { TaskContext } from 'constants/taskContext';
import styles from './index.module.scss';

const OptionsMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(getVerifyIdUser);
  const task = useContext(TaskContext);

  const handleCloneTask = (): void => {
    if (task && canUserDuplicateTask(userId, task)) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: false }));
    } else notification.warn({ message: 'Нет прав на дублирование задачи' });
  };

  const handleDeleteTask = (): void => {
    if (task && isUserTaskAuthor(userId, task)) {
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

export default OptionsMenu;
