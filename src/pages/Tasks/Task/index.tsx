import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { fetchTaskAction } from 'store/task/thunk';
import { clearDataTask } from 'store/task/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskError, getTaskId, getTaskLoading } from 'store/task/selectors';
import Main from 'components/Task/Main';
import Info from 'components/Task/Info';
import { fetchAllMembers } from 'store/members/thunk';
import { fetchStatusesAction } from 'store/common/statuses/thunk';
import { fetchAllRoles } from 'store/common/roles/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import Preloader from 'components/Common/Preloader';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(/* false */ true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const taskId: string | undefined =
    'dedfb4d3-5ba0-45bd-9623-24b76c16dc2c'; /* useAppSelector(getTaskId) */
  const errorTask = useAppSelector(getTaskError);

  useEffect(() => {
    dispatch(fetchTaskAction(taskId));
    dispatch(fetchStatusesAction());
    dispatch(fetchAllMembers());
    dispatch(fetchAllRoles());
  }, [dispatch]);

  const handleCancel = () => {
    setVisible(false);
    dispatch(clearDataTask());
  };

  const loading = useAppSelector(getTaskLoading);

  if (loading) {
    return <Preloader />;
  }

  if (errorTask) {
    return <Navigate to={ROUTES.tasks.path} />;
  }

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      className={styles.task}
      footer={[]}
    >
      <div className={styles.taskContainer}>
        <Main />
        <Info />
      </div>
    </Modal>
  );
};

export default Task;
