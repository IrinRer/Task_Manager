import React, { useContext } from 'react';
import checkIcon from 'assets/icons/check.svg';
import FlexWrapper from 'components/Common/FlexWrapper';
import { TaskContext } from 'components/Home/taskContext';
import styles from './index.module.scss';

const Progress: React.FC = () => {
  const task = useContext(TaskContext);

  return (
    <FlexWrapper wrapperClassName={styles.wrapper}>
      {task?.progress ? (
        <>
          <img src={checkIcon} alt="checkIcon" /> {task.progress.completed}/
          {task.progress.total}
        </>
      ) : null}
    </FlexWrapper>
  );
};

export default Progress;
