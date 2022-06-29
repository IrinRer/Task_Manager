import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { IResponseTask } from 'store/common/task/types';
import { RIGHTS_NAMES } from 'constants/rights';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import { useNavigate } from 'react-router-dom';
import {
  clearEditDataTask,
  setModalDeleteTaskVisible,
  setModalVisible,
} from 'store/editTask/slice';
import { clearDataTask } from 'store/common/task/slice';
import { ROUTES } from 'constants/routes';
import { useGetRights } from 'customHooks/useGetRights';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getModalDeleteTaskVisible } from 'store/editTask/selectors';
import { setTaskToDelete } from 'store/tasks/slice';
import styles from './index.module.scss';

interface IProps {
  task: IResponseTask | null;
  setVisibleOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<IProps> = ({ task, setVisibleOptions }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRightsCopyTask = useGetRights(RIGHTS_NAMES.copyTask);
  const isRightsArchiveTask = useGetRights(RIGHTS_NAMES.moveToArchive);
  const isRightsDelTask = useGetRights(RIGHTS_NAMES.deleteTask);
  const isVisibleTaskDelete = useAppSelector(getModalDeleteTaskVisible);

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: true }));
    }
  };

  const handleOkDelete = () => {
    if (task) {
      dispatch(setTaskToDelete(task.task_id));
    }
    dispatch(setModalDeleteTaskVisible(false));
    setVisibleOptions(false);
    dispatch(setModalVisible(false));
    dispatch(clearDataTask());
    dispatch(clearEditDataTask());
    navigate(ROUTES.tasks.path);
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
        Переместить в архив
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
