import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { clearEditDataTask, setModalVisible } from 'store/editTask/slice';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import {
  getEditTaskError,
  getEditTaskLoading,
  getModalVisible,
} from 'store/editTask/selectors';
import Main from 'components/Task/Main';
import Info from 'components/Task/Info';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchTaskAction } from 'store/common/task/thunk';
import { setClickedAttachments } from 'store/editTask/attachments/slice';
import { clearDataTask } from 'store/common/task/slice';
import Preloader from 'components/Common/Preloader';
import { ROUTES } from 'constants/routes';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';

import { useWindowSize } from 'customHooks/useWindowSize';
import { MIN_DESKTOP_WIDTH } from 'constants/common';
import styles from './index.module.scss';

const Task: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modalVisible = useAppSelector(getModalVisible);
  const errorTask = useAppSelector(getEditTaskError);
  const params = useParams();
  const size = useWindowSize();
  const taskId = params.id;

  useEffect(() => {
    if (taskId) {
      dispatch(setModalVisible(true));
      dispatch(fetchTaskAction(taskId));
    }
  }, [dispatch, taskId]);

  const handleCancel = () => {
    dispatch(setModalVisible(false));
    dispatch(clearDataTask());
    dispatch(clearEditDataTask());
    dispatch(setClickedAttachments(false))
    navigate(ROUTES.tasks.path);
  };

  const loadingTask = useAppSelector(getEditTaskLoading);

  const isNotShow = errorTask || !taskId;

  if (loadingTask) {
    return <Preloader size="large" />;
  }

  if (isNotShow) {
    return <Navigate to={ROUTES.tasks.path} />;
  }

  return modalVisible ? (
    <Modal
      visible={modalVisible}
      confirmLoading={loadingTask}
      onCancel={handleCancel}
      className={styles.task}
      closeIcon={<CloseIcon id="close" />}
      footer={[]}
    >
      <div className={styles.taskContainer}>
        <Main />
        {(size.width || 0) >= MIN_DESKTOP_WIDTH && <Info />}
      </div>
    </Modal>
  ) : null;
};
export default Task;
