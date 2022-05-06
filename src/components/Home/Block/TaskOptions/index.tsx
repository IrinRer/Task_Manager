import { Button } from 'antd';
import React from 'react';
import styles from './index.module.scss';

interface IProps {
  task_id: string;
}

const TaskOptions: React.FC<IProps> = ({ task_id }) => {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} type="text">
        Опция 1
      </Button>
      <Button className={styles.button} type="text">
        Опция 2
      </Button>
      <Button className={styles.button} type="text">
        Опция 3
      </Button>
    </div>
  );
};

export default TaskOptions;
