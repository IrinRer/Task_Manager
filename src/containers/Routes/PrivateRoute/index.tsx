import React, { ReactElement, useEffect } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { getVerifyError, getVerifyLoading } from 'store/auth/verify/selectors';
import {
  getAuthError,
  getAuthLoading,
  getVerifyToken,
} from 'store/auth/token/selectors';
import Preloader from 'components/Common/Preloader';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { addVerifyToken } from 'store/auth/token/slice';
import { getToken } from 'helpers/cookies';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const verifyLoading = useAppSelector(getVerifyLoading);
  const authLoading = useAppSelector(getAuthLoading);
  const loading = verifyLoading || authLoading;
  const verifyToken = useAppSelector(getVerifyToken);
  const verifyError = useAppSelector(getVerifyError);
  const authError = useAppSelector(getAuthError);
  const error = verifyError || authError;
  const token = getToken();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error || !token) {
      dispatch(addVerifyToken(null));
      navigate(ROUTES.login.path);
    }
  }, [dispatch, error, navigate, token]);

  if (loading) {
    return <Preloader size="large" />;
  }

  return <>{verifyToken ? Component : null}</>;
};

export default PrivateRoute;
