import React, { ReactElement } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { getVerifyLoading } from 'store/auth/verify/selectors';
import Preloader from 'components/Common/Preloader';
import { getAuthLoading, getVerifyToken } from 'store/auth/token/selectors';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const verifyLoading = useAppSelector(getVerifyLoading);
  const authLoading = useAppSelector(getAuthLoading);
  const loading = verifyLoading || authLoading;
  const verifyToken = useAppSelector(getVerifyToken);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : verifyToken ? (
        Component
      ) : (
        <Navigate to={ROUTES.login.path} />
      )}
    </>
  );
};

export default PrivateRoute;
