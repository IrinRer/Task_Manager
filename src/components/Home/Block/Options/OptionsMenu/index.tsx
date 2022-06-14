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
import ModalDeleteDelay from 'components/Common/ModalDeleteDelay';
import styles from './index.module.scss';

interface IProps {
  isVisibleDelete: boolean;
  setIsVisibleDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<IProps> = ({
  isVisibleDelete,
  setIsVisibleDelete,
  setVisibleOptions,
}) => {
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
    setVisibleOptions(false);
  };

  const handleOk = () => {
    if (task) {
      dispatch(deleteTaskAction(task.task_id));
    } else notification.warn({ message: 'Удалить задачу может только автор' });
    setIsVisibleDelete(false);
    setVisibleOptions(false);
  };

  const handleCancel = () => {
    setIsVisibleDelete(false);
    setVisibleOptions(false);
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
        onClick={() => {
          setIsVisibleDelete(true);
        }}
      >
        Удалить задачу
      </Button>
      <ModalDeleteDelay
        visible={isVisibleDelete}
        textMain={`Задача будет удалена через N сек... Для отмены нажмите "Отмена"`}
        textButton="Удалить"
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default OptionsMenu;
