import React, { useEffect } from 'react';

import { fetchAllRoles } from 'store/common/roles/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getToken } from 'helpers/cookies';
import { fetchVerifyAction } from 'store/auth/verify/thunk';
import { getVerifyToken } from 'store/auth/token/selectors';
import CreateRoutes from 'containers/Routes';
import { addVerifyToken } from 'store/auth/token/slice';
import { getModalVisible } from 'store/editTask/selectors';
import { fetchUsersAction } from '../../store/users/thunk';
import { fetchTagsAction } from '../../store/common/tags/thunk';
import { fetchTasksAction } from '../../store/tasks/thunk';
import { fetchPrioritiesAction } from '../../store/common/priorities/thunk';
import { fetchStatusesAction } from '../../store/common/statuses/thunk';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(getVerifyIdUser);
  const token = getToken();
  const verifyToken = useAppSelector(getVerifyToken);
  const modalVisible = useAppSelector(getModalVisible);

  useEffect(() => {
    if (token) dispatch(fetchVerifyAction(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (userID) dispatch(addVerifyToken(token!));
  }, [dispatch, token, userID]);

  useEffect(() => {
    if (verifyToken) {
      dispatch(fetchUsersAction());
      dispatch(fetchTagsAction());
      // dispatch(fetchTasksAction());
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
