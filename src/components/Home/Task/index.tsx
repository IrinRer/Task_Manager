import { Button } from 'antd';
import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getHomeTaskId } from 'store/common/task/selectors';
import { setTaskId } from 'store/common/task/slice';

import style from './index.module.scss';

const Task = ({ task }) => {
  const dispatch = useAppDispatch();
  const taskId = useAppSelector(getHomeTaskId);
  const [isShouldOpenTask, setIsShouldOpenTask] = useState<boolean>(false);

  const openTask = () => {
    dispatch(setTaskId(task.task_id));
    setIsShouldOpenTask(true);
  };

  if (taskId && isShouldOpenTask) {
    return <Navigate to={ROUTES.editTask.path} />;
  }

  return (
    <div className={style.task}>
      <p>task_id: {task.task_id}</p>
      <p>title: {task.title}</p>
      <p>status: {JSON.stringify(task.status)}</p>
      <p>priority: {JSON.stringify(task.priority)}</p>
      <p>tags: {JSON.stringify(task.tags)}</p>
      <p>progress: {JSON.stringify(task.progress)}</p>
      <p>attachments: {JSON.stringify(task.storage_files_meta)}</p>
      <Button onClick={openTask}>Открыть задачу</Button>
    </div>
  );
};

export default Task;
