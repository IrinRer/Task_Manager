import React from 'react';

import style from './index.module.scss';

const Task = ({ task }) => {
  return (
    <div className={style.task}>
      <p>task_id: {task.task_id}</p>
      <p>title: {task.title}</p>
      <p>status: {JSON.stringify(task.status)}</p>
      <p>priority: {JSON.stringify(task.priority)}</p>
      <p>tags: {JSON.stringify(task.tags)}</p>
      <p>progress: {JSON.stringify(task.progress)}</p>
      <p>attachments: {JSON.stringify(task.storage_files_meta)}</p>
    </div>
  );
};

export default Task;
