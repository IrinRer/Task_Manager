import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { createTaskAction, fetchTaskAction } from 'store/task/thunk';
import {
  clearDataTask,
  createStatusId,
  createTitle,
  onetaskSlice,
} from 'store/task/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getDataCreate,
  getDefaultStatusId,
  getDescription,
  getTitle,
} from 'store/task/selectors';
import styles from './index.module.scss';
import Info from './Info';
import Main from './Main';

const Task: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const dispatch = useDispatch();
  const data = useAppSelector(getDataCreate);
  const defaultStatus = useAppSelector(getDefaultStatusId);

  useEffect(() => {
    // dispatch(fetchTaskAction('e402548c-6cec-4040-ade1-617de32af311'));
    // dispatch(createTitle('TTTTT'));
  }, [dispatch]);

  const showModal = () => {
    setVisible(true);
  };

  /* const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  }; */

  /* const handleSave = () => {
    const a = '';
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  }; */

  const handleSaveTask = () => {
    setConfirmLoading(true);
    if (data.task_status_id === '') {
      dispatch(createStatusId(defaultStatus || ''));
    }
    dispatch(
      createTaskAction({
        title: data.title,
        task_status_id: data.task_status_id
          ? data.task_status_id
          : defaultStatus,
      }),
    );
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
    dispatch(clearDataTask());
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Task
      </Button>
      <Button type="primary" onClick={showModal}>
        Change Task
      </Button>

      <Modal
        visible={visible}
        onOk={handleSaveTask}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={styles.task}
        footer={[]}
      >
        <div className={styles.taskContainer}>
          <Main />
          <Info />
        </div>
        <Button className={styles.saveTask} onClick={handleSaveTask}>
          Сохранить
        </Button>
      </Modal>
    </>
  );
};

export default Task;
