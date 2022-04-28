import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskStatus, getTaskResponsible } from 'store/task/selectors';

import styles from './index.module.scss';

const Info: React.FC = () => {
  const responsible = useAppSelector(getTaskResponsible);
  const status = useAppSelector(getTaskStatus);

  return (
    <>
      <div className={styles.infoLine}>
        <span>Статус</span> <span>{status}</span>
      </div>
      <div className={styles.infoLine}>
        <span>Ответственный</span>
        <span>{responsible ? responsible.name : null}</span>
      </div>
    </>
  );
};

export default Info;
