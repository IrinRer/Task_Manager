import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTask, getTaskResponsible } from 'store/task/selectors';
import styles from './index.module.scss';

const Info: React.FC = () => {
  const data = useAppSelector(getTask);
  const responsible = useAppSelector(getTaskResponsible);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Статус</span> <span>{data?.status.name}</span>
      </div>
      <div className={styles.infoLine}>
        <span>Ответственный</span>
        <span>{responsible ? responsible.name : ''}</span>
      </div>
    </>
  );
};

export default Info;
