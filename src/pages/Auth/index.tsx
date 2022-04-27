import React from 'react';
import { getAuthLoading } from 'store/auth/token/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Preloader from 'components/Preloader';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import {
  getVerifyIdUser,
  getVerifyLoading,
  getVerifyToken,
} from 'store/auth/verify/selectors';
import style from './index.module.scss';
import FormAuth from '../../components/Auth/FormAuth';

const Auth: React.FC = () => {
  const authLoading = useAppSelector(getAuthLoading);
  const verifyLoading = useAppSelector(getVerifyLoading);
  const loading = authLoading || verifyLoading;
  const verifyToken = useAppSelector(getVerifyToken);
  const userID = useAppSelector(getVerifyIdUser);

  return (
    <div className={style.wrapper}>
      {loading ? (
        <Preloader />
      ) : verifyToken || userID ? (
        <Navigate to={ROUTES.tasks.path} />
      ) : (
        <FormAuth />
      )}
    </div>
  );
};

export default Auth;
