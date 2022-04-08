import React, { useEffect } from 'react';
import logo from 'assets/logo.svg';
import Cookies from 'universal-cookie';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchValidAction } from 'store/validate/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getValidateError, getValidateIdUser } from 'store/validate/selectors';
import Auth from 'pages/Auth';
import Tasks from './Tasks';
import styles from './index.module.scss';

const Hello: React.FC = () => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();

  const isTokenValid = () => {
    dispatch(fetchValidAction(cookies.get('token')));
  };

  const userID = useAppSelector(getValidateIdUser);
  const error = useAppSelector(getValidateError);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(isTokenValid, []);

  return !userID || error ? (
    <Auth />
  ) : (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>Стажировка по фронтенду (группа 3) &#128293;</p>
      <Tasks />
    </div>
  );
};

export default Hello;
