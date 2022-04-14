import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createTaskAction, fetchTaskAction } from 'store/task/thunk';
import {
  clearDataTask,
  createStatusId,
  createTitle,
  onetaskSlice,
  setTaskId,
} from 'store/task/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getDataCreate,
  getDefaultStatusId,
  getDescription,
  getTask,
  getTaskId,
  getTitle,
} from 'store/task/selectors';
import styles from './index.module.scss';
import Info from './Info';
import Main from './Main';

const Task: React.FC = () => {
  const [visible, setVisible] = React.useState(/* false */ true);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  // const data = useAppSelector(getDataCreate);
  const data = useAppSelector(getTask);
  const defaultStatus = useAppSelector(getDefaultStatusId);
  const taskId = useAppSelector(getTaskId);

  useEffect(() => {
    // dispatch(fetchTaskAction('11191e21-f578-4ce1-8bff-88c8f733abf1'));
    dispatch(fetchTaskAction('bc55eb8e-05fc-4ca9-823d-23839bcf4b55'));
    // dispatch(fetchTaskAction('cbb7199e-cb25-4dce-bf4e-24a8a5e07ef2'));
  }, [dispatch]);

  const showModal = () => {
    setVisible(true);
  };

  const changeTask = () => {
    if (taskId) {
      setVisible(true);
    }
  };

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
    <>
      {/* <Button type="primary" onClick={showModal}>
        Create Task
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={changeTask}>
        Change Task
  </Button> */}

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
        {/*
        <Button className={styles.saveTask} onClick={handleSaveTask}>
          Сохранить
        </Button>
  */}
      </Modal>
    </>
  );
};

export default Task;
