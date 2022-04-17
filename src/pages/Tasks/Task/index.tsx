import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchTaskAction } from 'store/task/thunk';
import { clearDataTask } from 'store/task/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskId } from 'store/task/selectors';
import Main from 'components/Task/Main';
import Info from 'components/Task/Info';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const [visible, setVisible] = React.useState(/* false */ true);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  const taskId = useAppSelector(getTaskId);

  useEffect(() => {
    // dispatch(fetchTaskAction('11191e21-f578-4ce1-8bff-88c8f733abf1'));
    dispatch(fetchTaskAction('bc55eb8e-05fc-4ca9-823d-23839bcf4b55'));
  }, [dispatch]);

  /* const showModal = () => {
    setVisible(true);
  };

  const changeTask = () => {
    if (taskId) {
      setVisible(true);
    }
  }; */

  /* const handleSaveTask = () => {
    setConfirmLoading(true);
    dispatch(
      createTaskAction({
        title: data.title,
        task_status_id: data.status.task_status_id
          ? data.status.task_status_id
          : defaultStatus,
      }),
    );
    setVisible(false);
    setConfirmLoading(false);
  }; */

  /* const handleCreateTask = () => {
    setConfirmLoading(true);
    if (data.status.task_status_id === '') {
      dispatch(createStatusId(defaultStatus || ''));
    }
    dispatch(
      createTaskAction({
        title: data.title,
        task_status_id: data.status.task_status_id
          ? data.status.task_status_id
          : defaultStatus,
      }),
    );
    setVisible(false);
    setConfirmLoading(false);
  }; */

  const handleCancel = () => {
    setVisible(false);
    dispatch(clearDataTask());
  };

  return (
    <Modal
      visible={visible}
      // onOk={handleSaveTask}
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
