import React, { useContext } from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import ModalDeleteDelay from 'components/Common/ModalDeleteDelay';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getModalDeleteTaskVisible } from 'store/editTask/selectors';
import { setModalDeleteTaskVisible } from 'store/editTask/slice';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

interface IProps {
  setVisibleOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<IProps> = ({ setVisibleOptions }) => {
  const dispatch = useAppDispatch();
  const task = useContext(TaskContext);

  const isRightsCopyTask = useGetRights(RIGHTS_NAMES.copyTask, task);
  const isRightsArchiveTask = useGetRights(RIGHTS_NAMES.moveToArchive, task);
  const isRightsDelTask = useGetRights(RIGHTS_NAMES.deleteTask, task);
  const isVisibleTaskDelete = useAppSelector(getModalDeleteTaskVisible);

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: false }));
    }
    setVisibleOptions(false);
  };

  const handleOk = () => {
    if (task) {
      dispatch(deleteTaskAction(task.task_id));
    }
    dispatch(setModalDeleteTaskVisible(false));
    setVisibleOptions(false);
  };

  const handleCancel = () => {
    dispatch(setModalDeleteTaskVisible(false));
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
          dispatch(setModalDeleteTaskVisible(true));
        }}
      >
        Удалить задачу
      </Button>
      <ModalDeleteDelay
        visible={isVisibleTaskDelete}
        textMain={`Задача будет удалена через N сек... Для отмены нажмите "Отмена"`}
        textButton="Удалить"
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default OptionsMenu;
