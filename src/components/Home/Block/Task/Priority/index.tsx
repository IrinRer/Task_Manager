import { PriorityName } from 'constants/types/common';
import React, { useContext } from 'react';
import classnames from 'classnames';
import { PRIORITY_STYLES } from 'constants/common';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

const Priority: React.FC = () => {
  const task = useContext(TaskContext);
  if (!task) return null;
  const priority = task.priority?.name;

  const classNames = classnames(
    priority ? styles[PRIORITY_STYLES[PriorityName[priority]]] : '',
  );
  return priority ? (
    <div className={styles.wrapper}>
      <span className={classNames} />
      <span>{priority}</span>
    </div>
  ) : null;
};

export default Priority;
