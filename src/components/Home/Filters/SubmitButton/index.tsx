import React from 'react';
import { Button } from 'antd';
import { selectTasksTotalCount } from 'store/tasks/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import { toggleFilter } from 'store/tasks/slice';
import styles from './index.module.scss';

const SubmitButton: React.FC = () => {
  const tasksCount: number = useAppSelector(selectTasksTotalCount);
  const dispatch = useAppDispatch();

  const handleCLick = () => {
    dispatch(fetchTasksAction());
    dispatch(toggleFilter());
  };

  return (
    <div className={styles.button}>
      <Button type="primary" htmlType="button" onClick={handleCLick}>
        Показать {tasksCount} задач
      </Button>
    </div>
  );
};

export default SubmitButton;
