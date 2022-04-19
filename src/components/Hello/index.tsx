import React from 'react';
import logo from 'assets/logo.svg';
import Cookies from 'universal-cookie';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchVerifyAction } from 'store/verify/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyIdUser } from 'store/verify/selectors';
import { Navigate } from 'react-router-dom';
import Preloader from 'components/Preloader';
import Tasks from './Tasks';
import styles from './index.module.scss';

const Hello: React.FC = () => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();

  if (cookies.get('token')) dispatch(fetchVerifyAction(cookies.get('token')));
  const userID = useAppSelector(getVerifyIdUser);

  return !userID || !cookies.get('token') ? (
    <Navigate to="/auth" />
  ) : userID === 'loading' ? (
    <div className={styles.wrapper}>
      <Preloader />
    </div>
  ) : (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>Стажировка по фронтенду (группа 3) &#128293;</p>
      <Tasks />
    </div>
  );
};

export default Hello;
