import React, { useEffect } from 'react';

import { fetchAllRoles } from 'store/common/roles/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyError, getVerifyIdUser } from 'store/auth/verify/selectors';
import { getToken } from 'helpers/cookies';
import { fetchVerifyAction } from 'store/auth/verify/thunk';
import { getAuthError, getVerifyToken } from 'store/auth/token/selectors';
import CreateRoutes from 'containers/Routes';
import { addVerifyToken, resetAuth } from 'store/auth/token/slice';
import { getModalVisible } from 'store/editTask/selectors';
import { resetVerify } from 'store/auth/verify/slice';
import { fetchUsersAction } from '../../store/users/thunk';
import { fetchTagsAction } from '../../store/common/tags/thunk';
import { fetchTasksAction } from '../../store/tasks/thunk';
import { fetchPrioritiesAction } from '../../store/common/priorities/thunk';
import { fetchStatusesAction } from '../../store/common/statuses/thunk';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const verifyToken = useAppSelector(getVerifyToken);
  const modalVisible = useAppSelector(getModalVisible);
  const verifyError = useAppSelector(getVerifyError);
  const authError = useAppSelector(getAuthError);
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
    if (verifyToken && !modalVisible) {
      dispatch(fetchTasksAction());
    }
  }, [dispatch, modalVisible, verifyToken]);

  return <CreateRoutes />;
};

export default App;
