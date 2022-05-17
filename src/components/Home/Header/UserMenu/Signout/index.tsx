import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { resetToken } from 'helpers/cookies';
import React from 'react';
import { Link } from 'react-router-dom';
import { addVerifyToken } from 'store/auth/token/slice';
import style from './index.module.scss';

interface ITitleSignOut {
  title: string;
}

const Signout: React.FC<ITitleSignOut> = ({ title }) => {
  const dispatch = useAppDispatch();

  const userSignOut = () => {
    resetToken();
    dispatch(addVerifyToken(null));
  };

  return (
    <Link
      className={style.link}
      title={title}
      to={ROUTES.login.path}
      onClick={userSignOut}
    >
      {title}
    </Link>
  );
};

export default Signout;
