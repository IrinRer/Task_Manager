import React from 'react';
import { Button } from 'antd';
import { filtersCleared } from 'store/filters/slice';
import { useAppDispatch } from 'customHooks/redux/useAppDispatch';
import { fetchTasksAction } from 'store/tasks/thunk';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
// import { toggleFilter } from 'store/tasks/slice';
import styles from './index.module.scss';

const CloseButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleCLick = () => {
    dispatch(filtersCleared());
    dispatch(fetchTasksAction());
    const delFilter = setTimeout(() => {
      // dispatch(toggleFilter());
      clearTimeout(delFilter);
    }, 3000);
  };

  return (
    <div className={styles.button}>
      <Button type="default" htmlType="reset" onClick={handleCLick}>
        <CloseIcon id="closeFilter" />
      </Button>
    </div>
  );
};

export default CloseButton;
