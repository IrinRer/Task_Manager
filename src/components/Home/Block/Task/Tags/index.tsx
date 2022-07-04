import React, { useContext } from 'react';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';
import RenderTags from './RenderTags';

const Tags: React.FC = () => {
  const task = useContext(TaskContext);
  const tags = task?.tags;

  return (
    <div className={styles.wrapper}>{tags?.length ? <RenderTags /> : null}</div>
  );
};

export default Tags;
