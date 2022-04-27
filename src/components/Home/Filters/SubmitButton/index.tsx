import React from 'react';
import { Button } from 'antd';
import { selectTasksTotalCount } from 'store/tasks/selectors';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import styles from './index.module.scss';

const SubmitButton: React.FC = () => {
  const tasksCount: number = useAppSelector(selectTasksTotalCount);

  return (
    <Button
      type="primary"
      htmlType="button"
      onClick={() => {}}
      className={styles.button}
    >
      Показать {tasksCount} задач
    </Button>
  );
};

export default SubmitButton;
