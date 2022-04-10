import React from 'react';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchAuthAction } from 'store/auth/thunk';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getValidateIdUser } from 'store/validate/selectors';
import { fetchValidAction } from 'store/validate/thunk';
import Preloader from 'components/Preloader';
import styles from './style.module.scss';

const FormAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();

  const onFinish = ({ id }: { id: string }) => {
    dispatch(fetchAuthAction(id));
  };

  dispatch(fetchValidAction(cookies.get('token')));

  const userID = useAppSelector(getValidateIdUser);

  const onFinishFailed = (errorInfo: any) => {
    notification.error({ message: 'Отправка формы не удалась!' });
  };

  return !!userID && userID !== 'loading' ? (
    <Navigate to="/" />
  ) : userID === 'loading' ? (
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
            message: 'Логин - число, количество цифр от 1 до 6!',
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
            message:
              'Пароль не менее 8 символов, из них латинские буквы, не менее 1 цифры и 1 заглавной буквы',
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
