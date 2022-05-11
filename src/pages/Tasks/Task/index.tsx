import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { clearEditDataTask } from 'store/editTask/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getEditTaskError, getEditTaskLoading } from 'store/editTask/selectors';
import Main from 'components/Task/Main';
import Info from 'components/Task/Info';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { fetchTaskAction } from 'store/common/task/thunk';
import { clearDataTask } from 'store/common/task/slice';
import { getHomeTaskId } from 'store/common/task/selectors';
import Preloader from 'components/Common/Preloader';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getHomeTaskId);
  const errorTask = useAppSelector(getEditTaskError);

  useEffect(() => {
    setVisible(true);
    if (taskId) {
      setVisible(true);
      dispatch(fetchTaskAction(taskId));
    }
  }, [dispatch, taskId]);

  const handleCancel = () => {
    setVisible(false);
    dispatch(clearDataTask());
    dispatch(clearEditDataTask());
  };

  const loadingTask = useAppSelector(getEditTaskLoading);

  const isNotShow = errorTask || !taskId;

  if (loadingTask) {
    return <Preloader size="large" />;
  }

  if (isNotShow) {
    return <Navigate to={ROUTES.tasks.path} />;
  }

  return visible ? (
    <Modal
      visible={visible}
      confirmLoading={loadingTask}
      onCancel={handleCancel}
      className={styles.task}
      footer={[]}
    >
      <div className={styles.taskContainer}>
        <Main />
        <Info />
      </div>
    </Modal>
  ) : null;
};
export default Task;
