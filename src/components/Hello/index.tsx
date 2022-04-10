import React from 'react';
import logo from 'assets/logo.svg';
import Cookies from 'universal-cookie';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchValidAction } from 'store/validate/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getValidateIdUser } from 'store/validate/selectors';
import { Navigate } from 'react-router-dom';
import Preloader from 'components/Preloader';
import Tasks from './Tasks';
import styles from './index.module.scss';

const Hello: React.FC = () => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();

  dispatch(fetchValidAction(cookies.get('token')));
  const userID = useAppSelector(getValidateIdUser);

  return !userID ? (
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
