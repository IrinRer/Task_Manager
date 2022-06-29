import React, { useContext } from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getModalDeleteTaskVisible } from 'store/editTask/selectors';
import { setModalDeleteTaskVisible } from 'store/editTask/slice';
import { TaskContext } from 'components/Home/taskContext';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import { setTaskToDelete } from 'store/tasks/slice';
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

  const handleOkDelete = () => {
    if (task) {
      dispatch(setTaskToDelete(task.task_id));
    }
    dispatch(setModalDeleteTaskVisible(false));
    setVisibleOptions(false);
  };

  const handleCancelDelete = () => {
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
      <ModalDeleteDelayWithNotice
        visible={isVisibleTaskDelete}
        textMain="Задача будет удалена"
        textButton="Удалить задачу"
        handleOk={handleOkDelete}
        handleCancel={handleCancelDelete}
      />
    </div>
  );
};

export default OptionsMenu;
