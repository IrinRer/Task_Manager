import React, { ReactElement } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { fetchVerifyAction } from 'store/verify/thunk';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { getVerifyIdUser } from 'store/verify/selectors';
import Preloader from 'components/Preloader';
import { getToken } from 'helpers/usersInfo';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(getVerifyIdUser);

  dispatch(fetchVerifyAction(getToken()));

  const isAuthenticated = getToken() ? !!userID : false;

  return userID === 'loading' ? (
    <Preloader />
  ) : isAuthenticated ? (
    Component
  ) : (
    <Navigate to={ROUTES.login.path} />
  );
};

export default PrivateRoute;
