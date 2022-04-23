import React from 'react';

import { useAppSelector } from 'customHooks/redux/useAppSelector';

import { selectTasks, selectTasksLoading } from 'store/tasks/selectors';
import Spinner from '../../Common/Spinner';
import Task from '../Task';
import styles from './index.module.scss';

const Tasks: React.FC = () => {
  const tasks = useAppSelector(selectTasks);
  const loading = useAppSelector(selectTasksLoading);

  if (loading) {
    return <Spinner size="large" />;
  }

  return (
    <div className={styles.tasks}>
      {/* TODO: insert tasks table */}
      {tasks?.length ? (
        tasks.map((task) => <Task key={task.task_id} task={task} />)
      ) : (
        <p>No tasks found given the filter values</p>
      )}
    </div>
  );
};

export default Tasks;
