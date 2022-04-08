import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getAuthLoading } from 'store/auth/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import FormAuth from '../../components/FormAuth';
import style from './style.module.scss';

const Auth: React.FC = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
  const loading = useAppSelector(getAuthLoading);
  return (
    <div className={style.wrapper}>
      {loading ? <Spin indicator={antIcon} /> : <FormAuth />}
    </div>
  );
};

export default Auth;
