import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTaskStatus, getTaskResponsible } from 'store/editTask/selectors';

import { ROLES } from 'constants/task';
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
        <span>{ROLES.responsible}</span>
        {responsible ? <span>{responsible.name}</span> : null}
      </div>
    </>
  );
};

export default Info;
