import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { cloneTaskAction } from 'store/createTask/thunk';
import { useGetRights } from 'customHooks/useGetRights';
import { RIGHTS_NAMES } from 'constants/rights';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getModalDeleteTaskVisible, getTask } from 'store/editTask/selectors';
import { setModalDeleteTaskVisible } from 'store/editTask/slice';
import { TaskContext } from 'components/Home/taskContext';
import ModalDeleteDelayWithNotice from 'components/Common/ModalDeleteDelayWithNotice';
import { changeTaskRoles, setTaskToDelete } from 'store/tasks/slice';
import {
  deleteTaskMemberAction,
  setTaskMemberAction,
} from 'store/editTask/thunk';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getWatcherRoleID } from 'store/common/roles/selectors';
import { isVerifyUserWatcherParams } from 'store/tasks/selectors';
import styles from './index.module.scss';

interface IProps {
  setVisibleOptions: React.Dispatch<React.SetStateAction<boolean>>;
}

const OptionsMenu: React.FC<IProps> = ({ setVisibleOptions }) => {
  const dispatch = useAppDispatch();
  const task = useContext(TaskContext);

  const isRightsCopyTask = useGetRights(RIGHTS_NAMES.copyTask, task);
  const isRightsSubscribeTask = useGetRights(RIGHTS_NAMES.subscription, task);
  const isRightsUnsubscribeTask = useGetRights(RIGHTS_NAMES.unsubscribe, task);
  const isRightsDelTask = useGetRights(RIGHTS_NAMES.deleteTask, task);
  const isVisibleTaskDelete = useAppSelector(getModalDeleteTaskVisible);
  const verifyUserId = useAppSelector(getVerifyIdUser);
  const watcherRoleID = useAppSelector(getWatcherRoleID);
  const isVerifyUserWatcher: boolean = useAppSelector((state) =>
    isVerifyUserWatcherParams(state, task || undefined),
  );

  const [isToggleSubscribe, setIsToggleSubscribe] = useState<boolean>(false);

  const changedTask = useAppSelector(getTask);

  useEffect(() => {
    if (changedTask && isToggleSubscribe) {
      dispatch(changeTaskRoles(changedTask));
      setIsToggleSubscribe(false);
    }
  }, [dispatch, changedTask, isToggleSubscribe]);

  const handleCloneTask = (): void => {
    if (task) {
      dispatch(cloneTaskAction({ id: task.task_id, edit: false }));
    }
    setVisibleOptions(false);
  };

  const handleOkDelete = () => {
    if (task) {
      dispatch(setTaskToDelete(task.task_id));
    }
    dispatch(setModalDeleteTaskVisible(false));
    setVisibleOptions(false);
  };

  const handleCancelDelete = () => {
    dispatch(setModalDeleteTaskVisible(false));
    setVisibleOptions(false);
  };

  const handleWatching = () => {
    if (task && verifyUserId && watcherRoleID && !isVerifyUserWatcher) {
      dispatch(
        setTaskMemberAction({
          task_id: task.task_id,
          assign_user_id: verifyUserId,
          task_role_id: watcherRoleID,
        }),
      );
      setIsToggleSubscribe(true);
    }
    if (task && verifyUserId && watcherRoleID && isVerifyUserWatcher) {
      dispatch(
        deleteTaskMemberAction({
          task_id: task.task_id,
          assign_user_id: verifyUserId,
          task_role_id: watcherRoleID,
        }),
      );
      setIsToggleSubscribe(true);
    }
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
        disabled={!(isRightsSubscribeTask || isRightsUnsubscribeTask)}
        className={styles.button}
        type="text"
        onClick={handleWatching}
      >
        {isVerifyUserWatcher ? 'Перестать отслеживать' : 'Отслеживать задачу'}
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
