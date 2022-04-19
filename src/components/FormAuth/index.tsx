import React from 'react';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchAuthAction } from 'store/auth/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getVerifyIdUser } from 'store/verify/selectors';
import { fetchVerifyAction } from 'store/verify/thunk';
import Preloader from 'components/Preloader';
import { getAuthLoading } from 'store/auth/selectors';
import { getToken } from 'helpers/usersInfo';
import { ROUTES } from 'constants/routes';
import styles from './style.module.scss';

const FormAuth: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = ({ id }: { id: string }) => {
    dispatch(fetchAuthAction(id));
  };

  if (getToken()) dispatch(fetchVerifyAction(getToken()));

  const userID = useAppSelector(getVerifyIdUser);
  const sendFormLoading = useAppSelector(getAuthLoading);

  const onFinishFailed = () => {
    notification.error({ message: 'Отправка формы не удалась!' });
  };

  return getToken() && userID ? (
    <Navigate to={ROUTES.tasks.path} />
  ) : sendFormLoading === true ? (
    <Preloader />
  ) : (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      colon={false}
      className={styles.auth}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger="onSubmit"
    >
      <h2>Авторизация</h2>
      <Form.Item
        label="Логин"
        name="id"
        rules={[
          {
            required: true,
            message: 'Неверный формат данных',
            pattern: /^[0-9]{1,6}$/gm,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        requiredMark={false}
        rules={[
          {
            required: true,
            message: 'Неверный пароль',
            pattern: /^.*(?=.{8,})(?=.*[0-9]+)(?=.*[A-Z]+)(?=.*[a-z]+).*$/gm,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormAuth;
