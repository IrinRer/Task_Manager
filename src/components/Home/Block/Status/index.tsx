import { StatusClass } from 'constants/common';
import { TaskStatusName } from 'constants/types/common';
import React from 'react';
import styles from './index.module.scss';

interface IProps {
  statusName: string;
}

const Status: React.FC<IProps> = ({ statusName }) => {
  return (
    <div className={styles.wrapper}>
      {/* для получения имени статуса по id беру TaskStatusName а не селектор статусов, потому что
      селектор статусов сам использует TaskStatusName и будут лишние вычисления */}
      {TaskStatusName[statusName] ? (
        <div className={styles[StatusClass[statusName]]}>
          {TaskStatusName[statusName].toUpperCase()}
        </div>
      ) : null}
    </div>
  );
};

export default Status;
