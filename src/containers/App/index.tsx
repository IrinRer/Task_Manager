import React, { useEffect, useRef } from 'react';
import { TTimer } from 'constants/types/common';
import { RELOAD_TASKS_INTERVAL } from 'constants/common';
import { fetchAllRoles } from 'store/common/roles/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyError } from 'store/auth/verify/selectors';
import { getToken } from 'helpers/cookies';
import { fetchVerifyAction } from 'store/auth/verify/thunk';
import { getAuthError, getVerifyToken } from 'store/auth/token/selectors';
import CreateRoutes from 'containers/Routes';
import { addVerifyToken, resetAuth } from 'store/auth/token/slice';
import { getModalVisible } from 'store/editTask/selectors';
import { resetVerify } from 'store/auth/verify/slice';
import { fetchUsersAction } from 'store/users/thunk';
import { fetchTagsAction } from 'store/common/tags/thunk';
import { fetchTasksAction } from 'store/tasks/thunk';
import { fetchPrioritiesAction } from 'store/common/priorities/thunk';
import { fetchStatusesAction } from 'store/common/statuses/thunk';
import { resetNotifications } from 'store/notifications/slice';
import { loadNewNotificationsAction } from 'store/notifications/thunk';
import { getShowNotificationModal } from 'store/notifications/selectors';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const reloadTasksRef = useRef<TTimer>(null);
  const token = getToken();
  const verifyToken = useAppSelector(getVerifyToken);
  const modalVisible = useAppSelector(getModalVisible);
  const verifyError = useAppSelector(getVerifyError);
  const authError = useAppSelector(getAuthError);
  const isNotificationModalOpen = useAppSelector(getShowNotificationModal);
  const error = verifyError || authError;
  const noAuth = error || !token;

  useEffect(() => {
    if (noAuth) {
      dispatch(addVerifyToken(null));
      dispatch(resetAuth());
      dispatch(resetVerify());
    }
  }, [dispatch, error, noAuth]);

  useEffect(() => {
    if (token) dispatch(fetchVerifyAction(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (verifyToken) {
      dispatch(fetchUsersAction());
      dispatch(fetchTagsAction());
      dispatch(fetchPrioritiesAction());
      dispatch(fetchStatusesAction());
      dispatch(fetchAllRoles());
    }
  }, [dispatch, verifyToken]);

  useEffect(() => {
    // !modalVisible для перезагрузки задач при закрытии модального окна
    // чтобы обновились задачи.
    if (verifyToken && !modalVisible) {
      dispatch(fetchTasksAction());
    }
    // Запускаем таймер для периодической загрузки задач
    clearReloadTasksInterval();
    reloadTasksRef.current = setInterval(() => {
      dispatch(fetchTasksAction());
      if (!isNotificationModalOpen) {
        dispatch(resetNotifications());
        dispatch(loadNewNotificationsAction());
      }
    }, RELOAD_TASKS_INTERVAL);

    return clearReloadTasksInterval;
    // eslint-disable-next-line
  }, [dispatch, modalVisible, verifyToken]);

  const clearReloadTasksInterval = () => {
    if (reloadTasksRef.current) {
      clearInterval(reloadTasksRef.current);
    }
  };

  return <CreateRoutes />;
};

export default App;
