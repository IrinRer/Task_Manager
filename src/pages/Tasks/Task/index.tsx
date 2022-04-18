import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import {
  fetchAllMembers,
  fetchAllRoles,
  fetchAllStatuses,
  fetchTaskAction,
} from 'store/task/thunk';
import { clearDataTask } from 'store/task/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskId } from 'store/task/selectors';
import Main from 'components/Task/Main';
import Info from 'components/Task/Info';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(/* false */ true);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const taskId: string | undefined = useAppSelector(getTaskId);

  useEffect(() => {
    // dispatch(fetchTaskAction('11191e21-f578-4ce1-8bff-88c8f733abf1'));
    dispatch(fetchTaskAction('bc55eb8e-05fc-4ca9-823d-23839bcf4b55'));
    dispatch(fetchAllStatuses());
    dispatch(fetchAllMembers());
    dispatch(fetchAllRoles());
  }, [dispatch]);

  const handleCancel = () => {
    setVisible(false);
    dispatch(clearDataTask());
  };

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
