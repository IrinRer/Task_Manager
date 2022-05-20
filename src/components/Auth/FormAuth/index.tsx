import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchAuthAction } from 'store/auth/token/thunk';
import { RULES, VALIDATEMESSAGE } from 'constants/rules';
import styles from './index.module.scss';

const FormAuth: React.FC = () => {
  const dispatch = useAppDispatch();

  const onFinish = ({ id }: { id: string }) => {
    if (navigator.onLine) {
      dispatch(fetchAuthAction(id));
    } else notification.error({ message: 'Отсутствует интернет-соединение!' });
  };

  const onFinishFailed = () => {
    notification.error({ message: 'Отправка формы не удалась!' });
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      autoComplete="off"
      colon={false}
      className={styles.auth}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateTrigger="onSubmit"
      validateMessages={VALIDATEMESSAGE}
    >
      <h2>Авторизация</h2>
      <Form.Item
        label="Логин"
        name="id"
        validateTrigger="onChange"
        rules={[
          {
            required: true,
            message: 'Неверный формат данных',
            pattern: /^[1-9]$|^[0-4][0-9]$|^50$/gm,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        requiredMark={false}
        rules={RULES.password}
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
