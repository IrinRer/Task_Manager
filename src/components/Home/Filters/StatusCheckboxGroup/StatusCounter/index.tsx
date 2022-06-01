import React, { useMemo } from 'react';

import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { selectStatusCounters } from 'store/filters/selectors';
import { IStatusCounter } from 'store/filters/types';
import styles from './index.module.scss';

interface IProps {
  task_status_id: string;
}

const StatusCounter: React.FC<IProps> = ({ task_status_id }) => {
  const counters: Array<IStatusCounter> = useAppSelector(selectStatusCounters);

  const counter: IStatusCounter | undefined = useMemo(
    () => counters.find((counter) => counter.task_status_id === task_status_id),
    [counters, task_status_id],
  );

  if (!counter) {
    return null;
  }

  return <p className={styles.counter}>{counter.value}</p>;
};

export default StatusCounter;
