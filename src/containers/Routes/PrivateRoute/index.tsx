/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import {
  getVerifyIdUser,
  getVerifyLoading,
  getVerifyToken,
} from 'store/auth/verify/selectors';
import Preloader from 'components/Common/Preloader';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const loading = useAppSelector(getVerifyLoading);
  const verifyToken = useAppSelector(getVerifyToken);
  const userID = useAppSelector(getVerifyIdUser);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : verifyToken || userID ? (
        Component
      ) : (
        <Navigate to={ROUTES.login.path} />
      )}
    </>
  );
};

export default PrivateRoute;
