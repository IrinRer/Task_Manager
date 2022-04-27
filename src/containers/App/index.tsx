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

  return <CreateRoutes />;
};

export default App;
