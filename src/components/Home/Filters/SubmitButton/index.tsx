import React from 'react';
import { Button } from 'antd';
import { selectTasksTotalCount } from 'store/tasks/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';

const SubmitButton: React.FC = () => {
  const tasksCount: number = useAppSelector(selectTasksTotalCount);

  return (
    <div className={styles.button}>
      <Button type="primary" htmlType="button" onClick={() => {}}>
        Показать {tasksCount} задач
      </Button>
    </div>
  );
};

export default SubmitButton;
