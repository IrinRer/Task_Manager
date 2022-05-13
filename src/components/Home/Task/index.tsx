import { Button } from 'antd';
import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setTaskId } from 'store/common/task/slice';

import style from './index.module.scss';

const Task = ({ task }) => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openTask = () => {
    // dispatch(setTaskId(task.task_id));
    navigate(`${ROUTES.editTask.path}${task.task_id}`);
  };

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
