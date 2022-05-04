/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyIdUser, getVerifyToken } from 'store/auth/verify/selectors';
import { getToken } from 'helpers/usersInfo';
import { fetchVerifyAction } from 'store/auth/verify/thunk';
import { addVerifyToken } from 'store/auth/verify/slice';
import { getGenerateToken } from 'store/auth/token/selectors';
import CreateRoutes from 'containers/Routes';
import { fetchUsersAction } from '../../store/users/thunk';
import { fetchTagsAction } from '../../store/common/tags/thunk';
import { fetchTasksAction } from '../../store/tasks/thunk';
import { fetchPrioritiesAction } from '../../store/common/priorities/thunk';
import { fetchStatusesAction } from '../../store/common/statuses/thunk';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(getVerifyIdUser);
  const token = getToken();
  const generateToken = useAppSelector(getGenerateToken);
  const verifyToken = useAppSelector(getVerifyToken);

  useEffect(() => {
    if (token) dispatch(fetchVerifyAction(token));
  }, []);

  useEffect(() => {
    if (userID || generateToken) dispatch(addVerifyToken(token!));
  }, [userID, generateToken]);

  useEffect(() => {
    if (verifyToken) {
      dispatch(fetchUsersAction());
      dispatch(fetchTagsAction());
      dispatch(fetchTasksAction());
      dispatch(fetchPrioritiesAction());
      dispatch(fetchStatusesAction());
    }
  }, [verifyToken]);

  return <CreateRoutes />;
};

export default App;
