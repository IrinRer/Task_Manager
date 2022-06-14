import React, { useContext } from 'react';
import { Button, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { TaskContext } from 'constants/taskContext';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { getRights } from 'helpers/rights';
import { RIGHTS_NAMES } from 'constants/rights';
import { ROLES } from 'constants/types/common';
import styles from './index.module.scss';

const OptionsMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const task = useContext(TaskContext);

  const myMaxRoleFromAllTask = useAppSelector((state) =>
    task ? getMyMaxRoleForTask(state, task) : ROLES.any,
  );
  const isRightsCopyTask = getRights(
    myMaxRoleFromAllTask,
    RIGHTS_NAMES.copyTask,
  );
  const isRightsArchiveTask = getRights(
    myMaxRoleFromAllTask,
    RIGHTS_NAMES.moveToArchive,
  );
  const isRightsDelTask = getRights(
    myMaxRoleFromAllTask,
    RIGHTS_NAMES.deleteTask,
  );

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: false }));
    } else notification.warn({ message: 'Нет прав на дублирование задачи' });
  };

  const handleDeleteTask = (): void => {
    if (task) {
      dispatch(deleteTaskAction(task.task_id));
    } else notification.warn({ message: 'Удалить задачу может только автор' });
  };

  return (
    <div className={styles.wrapper}>
      <Button
        disabled={!isRightsCopyTask}
        className={styles.button}
        type="text"
        onClick={handleCloneTask}
      >
        Дублировать задачу
      </Button>
      <Button
        disabled={!isRightsArchiveTask}
        className={styles.button}
        type="text"
      >
        Отслеживать задачу
      </Button>
      <Button
        disabled={!isRightsDelTask}
        className={styles.button}
        type="text"
        onClick={handleDeleteTask}
      >
        Удалить задачу
      </Button>
    </div>
  );
};

export default OptionsMenu;
