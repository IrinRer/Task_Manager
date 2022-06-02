import React from 'react';
import { Button } from 'antd';
import { filtersCleared } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import styles from './index.module.scss';

const ResetButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCLick = () => {
    dispatch(filtersCleared());
    dispatch(fetchTasksAction());
  };

  return (
    <div className={styles.button}>
      <Button type="default" htmlType="reset" onClick={handleCLick}>
        Очистить фильтры
      </Button>
    </div>
  );
};

export default ResetButton;
