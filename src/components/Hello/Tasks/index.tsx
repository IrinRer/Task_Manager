import React from 'react';
import { Button } from 'antd';

import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';

import { fetchTasksAction } from 'store/tasks/thunk';
import { getTasks, getTasksLoading } from 'store/tasks/selectors';

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(getTasks);
  const loading = useAppSelector(getTasksLoading);

  const getTasksHandler = () => {
    dispatch(fetchTasksAction());
  };
  return (
    <>
      <Button
        type="primary"
        disabled={false}
        loading={loading}
        onClick={getTasksHandler}
      >
        Выполнить запрос на получение задач
      </Button>
      <br />
      {!!tasks?.length &&
        tasks.map((el) => <div key={el.task_id}>{el.title}</div>)}
    </>
  );
};

export default Tasks;
