import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { IResponseTask } from 'store/common/task/types';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getRights } from 'helpers/rights';
import { getMyMaxRoleForTask } from 'store/common/roles/selectors';
import { RIGHTS_NAMES } from 'constants/rights';
import styles from './index.module.scss';

interface IProps {
  task: IResponseTask | null;
}

const OptionsMenu: React.FC<IProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const myMaxRole = useAppSelector(getMyMaxRoleForTask);
  const isRightsCopyTask = getRights(myMaxRole, RIGHTS_NAMES.copyTask);
  const isRightsArchiveTask = getRights(myMaxRole, RIGHTS_NAMES.moveToArchive);
  const isRightsDelTask = getRights(myMaxRole, RIGHTS_NAMES.deleteTask);

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
        Переместить в архив
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
