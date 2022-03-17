import React, { useState } from 'react';
import { Button } from 'antd';

import logo from 'assets/logo.svg';

import styles from './index.module.scss';

const Hello: React.FC<any> = ({ token }) => {
  const [data, setData] = useState([]);
  const { REACT_APP_TASK_BACKEND_URL } = process.env;

  const getTasks = () => {
    fetch(`${REACT_APP_TASK_BACKEND_URL}/api/v1.0/task/tasks`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => setData(data));
  };

  return (
    <div className={styles.wrapper}>
      <img src={logo} className={styles.logo} alt="logo" />
      <p>Стажировка по фронтенду (группа 3) &#128293;</p>
      <Button type="primary" disabled={!token} onClick={getTasks}>
        Сделать запрос на получение задач
      </Button>
      {!!data.length && (
        <>
          <h2>Список полученных задач</h2>
          {data.map((el: any) => (
            <div key={el.task_id}>
              <p>{el.title}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Hello;
