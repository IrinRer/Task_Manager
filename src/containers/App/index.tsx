/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CreateRoutes from 'containers/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import { getToken } from 'helpers/usersInfo';
import { fetchVerifyAction } from 'store/auth/verify/thunk';
import { addVerifyToken } from 'store/auth/verify/slice';
import { getGenerateToken } from 'store/auth/token/selectors';
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

  useEffect(() => {
    if (token) dispatch(fetchVerifyAction(token));
  }, []);

  useEffect(() => {
    if (userID || generateToken) dispatch(addVerifyToken(token!));
  }, [userID, generateToken]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsersAction());
      dispatch(fetchTagsAction());
      dispatch(fetchTasksAction());
      dispatch(fetchPrioritiesAction());
      dispatch(fetchStatusesAction());
    }
  }, [generateToken]);

  return <CreateRoutes />;
};

export default App;
