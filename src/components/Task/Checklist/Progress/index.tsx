import React from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getCheckListProgress } from 'store/editTask/selectors';
import styles from './index.module.scss';

const CheckListProgress: React.FC = () => {
  const checkListProgress = useAppSelector(getCheckListProgress);

  return (
    <div className={styles.headerSection}>
      <p className={styles.progressPercentage}>{`${
        checkListProgress?.percent || 0
      }%`}</p>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${checkListProgress?.percent || 0}%` }}
        />
      </div>
    </div>
  );
};

export default CheckListProgress;
