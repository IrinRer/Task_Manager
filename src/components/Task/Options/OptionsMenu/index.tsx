import React from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { deleteTaskAction } from 'store/tasks/thunk';
import { IResponseTask } from 'store/common/task/types';
import { RIGHTS_NAMES } from 'constants/rights';
import ModalDeleteDelay from 'components/Common/ModalDeleteDelay';
import { useNavigate } from 'react-router-dom';
import { clearEditDataTask, setModalVisible } from 'store/editTask/slice';
import { clearDataTask } from 'store/common/task/slice';
import { ROUTES } from 'constants/routes';
import { useGetRights } from 'customHooks/useGetRights';
import styles from './index.module.scss';

interface IProps {
  task: IResponseTask | null;
  isVisibleDelete: boolean;
  setIsVisibleDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<IProps> = ({
  task,
  isVisibleDelete,
  setIsVisibleDelete,
  setVisibleOptions,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isRightsCopyTask = useGetRights(RIGHTS_NAMES.copyTask);
  const isRightsArchiveTask = useGetRights(RIGHTS_NAMES.moveToArchive);
  const isRightsDelTask = useGetRights(RIGHTS_NAMES.deleteTask);

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: true }));
    }
  };

  const handleOk = () => {
    if (task) {
      dispatch(deleteTaskAction(task.task_id));
    }
    setIsVisibleDelete(false);
    setVisibleOptions(false);
    dispatch(setModalVisible(false));
    dispatch(clearDataTask());
    dispatch(clearEditDataTask());
    navigate(ROUTES.tasks.path);
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
        Переместить в архив
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
