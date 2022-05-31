import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { IResponseTask } from 'store/common/task/types';
import styles from './index.module.scss';

interface IProps {
  task: IResponseTask | null;
}

const OptionsMenu: React.FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: true }));
    }
  };

  const handleDeleteTask = (): void => {
    if (task) {
      dispatch(deleteTaskAction(task.task_id));
    }
  };

  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} type="text" onClick={handleCloneTask}>
        Дублировать задачу
      </Button>
      <Button className={styles.button} type="text">
        Переместить в архив
      </Button>
      <Button className={styles.button} type="text" onClick={handleDeleteTask}>
        Удалить задачу
      </Button>
    </div>
  );
};

export default OptionsMenu;
