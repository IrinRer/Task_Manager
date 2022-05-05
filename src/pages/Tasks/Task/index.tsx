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
import Spinner from 'components/Common/Spinner';
import { getHomeTaskId } from 'store/common/task/selectors';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const taskId: string | undefined =
  // 'dedfb4d3-5ba0-45bd-9623-24b76c16dc2c';
  //  '2d497445-f89c-4de6-aec3-c69985c7a54a';
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
    return (
      <Spinner
        // className={`${styles.mainSpinner}`}
        margin="0 auto"
        size="large"
      />
    );
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
