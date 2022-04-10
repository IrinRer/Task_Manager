import React from 'react';
import { getAuthLoading } from 'store/auth/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import Preloader from 'components/Preloader';
import FormAuth from '../../components/FormAuth';
import style from './style.module.scss';

const Auth: React.FC = () => {
  const loading = useAppSelector(getAuthLoading);
  return (
    <div className={style.wrapper}>
      {loading ? <Preloader /> : <FormAuth />}
    </div>
  );
};

export default Auth;
